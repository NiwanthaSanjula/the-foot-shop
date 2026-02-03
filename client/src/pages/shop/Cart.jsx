/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import { FaPlus, FaMinus, FaRegCreditCard, FaRegStickyNote, FaShoppingBag } from "react-icons/fa";
import { MdDelete, MdEdit, MdLocalShipping, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import toast from 'react-hot-toast';
import AddressModal from '../../components/shop/AddressModal';
import { addressService } from '../../services/addressService';
import Spinner from '../../components/common/Spinner';
import { orderService } from '../../services/orderService';

const Cart = () => {

    const {
        user,
        navigate,
        cartItems,
        getCartTotal,
        setCartItems,
        increaseQty,
        decreaseQty,
        removeFromCart,
        globalLoading,
        setGlobalLoading
    } = useAppContext()

    // --- STATES ---
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    // Guest Address State
    const [guestAddress, setGuestAddress] = useState({
        fullName: '', email: '', phoneNumber: '', street: '', city: '', district: '', postalCode: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [orderNote, setOrderNote] = useState("");

    // --- FETCH ADDRESSES (Only for Users) ---
    const fetchAddresses = async () => {
        if (!user) return

        setGlobalLoading(true)
        try {
            const data = await addressService.getAddresses()
            if (data.success) {
                setAddresses(data.addresses)
                const defaultAddr = data.addresses.find(a => a.isDefault);
                if (defaultAddr) setSelectedAddressId(defaultAddr._id);
                else if (data.addresses.length > 0) setSelectedAddressId(data.addresses[0]._id)
            }
        } catch (error) {
            toast.error('Error loading Addresses!')
            console.log(error);
        } finally {
            setGlobalLoading(false)
        }
    }

    // --- EFFECTS ---
    useEffect(() => {
        if (user) fetchAddresses()
    }, [user]);

    // --- HANDLERS ---
    const handleOpenAddModal = () => { setEditingAddress(null); setShowAddressModal(true); };
    const handleOpenEditModal = (addr) => { setEditingAddress(addr); setShowAddressModal(true); };
    const handleCloseModal = () => { setShowAddressModal(false); setEditingAddress(null); };

    const handleSaveAddress = async (addressData) => {
        setGlobalLoading(true)
        try {
            if (editingAddress) {
                const response = await addressService.updateAddress({ ...addressData, id: editingAddress._id })
                if (response.success) {
                    toast.success(response.message)
                    fetchAddresses()
                }
            } else {
                const response = await addressService.addAddress(addressData)
                if (response.success) {
                    toast.success(response.message)
                    fetchAddresses()
                }
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setGlobalLoading(false)
        }
        handleCloseModal();
    };

    const handleDeleteAddress = async (id) => {
        if (!window.confirm("Delete this address ?")) return
        try {
            const response = await addressService.deleteAddress(id);
            if (response.success) {
                toast.success(response.message)
                fetchAddresses()
                if (selectedAddressId === id) setSelectedAddressId(null)
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    //================================================================================================
    // PLACE ORDER LOGIC
    //================================================================================================
    const handlePlaceOrder = async () => {
        try {
            // ========== VALIDATION ==========
            if (cartItems.length === 0) {
                return toast.error("Cart is empty");
            }

            // ========== DETERMINE ADDRESS ==========
            let deliveryAddress = null;

            if (user) {
                if (!selectedAddressId) return toast.error("Please select an address");
                const savedAddr = addresses.find(a => a._id === selectedAddressId);
                if (!savedAddr) return toast.error("Address not found");

                deliveryAddress = {
                    ...savedAddr,
                    email: user.email
                };
            } else {
                const { fullName, email, phoneNumber, street, city, district, postalCode } = guestAddress;
                if (!fullName?.trim()) return toast.error("Full name is required");
                if (!email?.trim()) return toast.error("Email is required");
                if (!phoneNumber?.trim()) return toast.error("Phone number is required");
                if (!street?.trim()) return toast.error("Street is required");
                if (!city?.trim()) return toast.error("City is required");
                if (!district?.trim()) return toast.error("District is required");
                if (!postalCode?.trim()) return toast.error("Postal code is required");

                deliveryAddress = guestAddress;
            }

            // ========== CALCULATE TOTALS ==========
            const subtotal = getCartTotal();
            const shippingCost = 5.00;
            const total = subtotal + shippingCost;

            const orderData = {
                items: cartItems,
                address: deliveryAddress,
                amount: total,
                paymentMethod: paymentMethod,
                note: orderNote
            };

            // ========== PLACE ORDER ==========
            setGlobalLoading(true);
            const response = await orderService.placeOrder(orderData);

            if (response.success) {

                // === STRIPE REDIRECT LOGIC ===
                if (paymentMethod === 'stripe') {
                    // Redirect to Stripe Checkout Page
                    window.location.replace(response.session_url);
                    return; // Stop here, don't clear cart or navigate yet
                }

                // === COD LOGIC ===
                setCartItems([]);
                localStorage.removeItem('cartItems');
                toast.success("Order Placed Successfully!");

                if (user) {
                    navigate('/my-orders');
                } else {
                    navigate('/order-success');
                }
            } else {
                toast.error(response.message || 'Failed to place order');
            }

        } catch (error) {
            console.error('❌ Order Error:', error.response?.data || error.message);
            toast.error(error.message || "Failed to place order");
        } finally {
            setGlobalLoading(false);
        }
    };

    // --- CALCULATIONS ---
    const subtotal = getCartTotal();
    const shippingCost = 5.00;
    const total = subtotal + shippingCost;

    // =================================================================
    // EMPTY CART STATE
    // =================================================================
    if (cartItems.length === 0) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center gap-5 bg-gray-50 px-4'>
                <div className='p-6 bg-white rounded-full shadow-sm'>
                    <MdOutlineRemoveShoppingCart size={60} className='text-red-300' />
                </div>
                <div className='text-center'>
                    <h2 className='text-2xl font-Zalando text-gray-700 mb-2'>Your Cart is Empty</h2>
                    <p className='text-gray-500 mb-8 max-w-sm mx-auto'>
                        Looks like you haven't added anything to your cart yet. Explore our collection today!
                    </p>
                    <button onClick={() => navigate('/shop')} className='px-8 py-3.5 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 flex items-center gap-2 mx-auto'>
                        <FaShoppingBag /> Start Shopping
                    </button>
                </div>
            </div>
        )
    }

    // =================================================================
    // CHECKOUT UI 
    // =================================================================
    return (
        <div className='min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-56 pt-40 pb-12 bg-gray-50'>

            <h2 className='text-3xl font-Zalando text-gray-700 mb-8 border-b-2 border-red-500 pb-2 inline-block'>
                Checkout
            </h2>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

                {/* ================= LEFT COLUMN ================= */}
                <div className='lg:col-span-2 space-y-6'>

                    {/* 1. DELIVERY ADDRESS SECTION */}
                    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-3 border-l-red-500'>
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className='text-lg font-Zalando font-semibold flex items-center gap-2'>
                                <MdLocalShipping className='text-red-500' /> <span className='text-gray-700'>Delivery Address</span>
                            </h3>
                            {user && (
                                <button onClick={handleOpenAddModal} className='text-sm text-red-600 font-semibold hover:underline cursor-pointer'>
                                    + Add New
                                </button>
                            )}
                        </div>

                        {/* ADDRESS LOGIC: USER VS GUEST */}
                        {user ? (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                {globalLoading ? (
                                    <div className='flex items-center justify-center col-span-2'><Spinner color='text-red-500' /></div>
                                ) : (
                                    <>
                                        {addresses.length > 0 ? (
                                            addresses.map(addr => (
                                                <div key={addr._id} onClick={() => setSelectedAddressId(addr._id)}
                                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all relative ${selectedAddressId === addr._id ? 'border-red-500 bg-red-50/50' : 'border-gray-200 hover:border-red-200'}`}>
                                                    <div className='flex justify-between'>
                                                        <span className='font-bold text-gray-800'>{addr.fullName}</span>
                                                        {selectedAddressId === addr._id && <span className='text-xs bg-red-500 text-white px-2 py-0.5 rounded'>Selected</span>}
                                                    </div>
                                                    <p className='text-sm text-gray-600 mt-1'>{addr.street}, {addr.city}</p>
                                                    <p className='text-sm text-gray-600'><span className='font-bold'>Phone :</span> {addr.phoneNumber}</p>

                                                    <div className='mt-3 flex gap-3 text-xs font-medium text-gray-500'>
                                                        <button onClick={(e) => { e.stopPropagation(); handleOpenEditModal(addr) }} className='hover:text-blue-600 flex items-center gap-1'><MdEdit /> Edit</button>
                                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr._id) }} className='hover:text-red-600 flex items-center gap-1'><MdDelete /> Remove</button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className='text-gray-400 text-sm col-span-2 text-center py-4'>No saved addresses. Add one to continue.</p>
                                        )}
                                    </>
                                )}
                            </div>
                        ) : (
                            /* GUEST FORM */
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className='border border-gray-300 p-3 rounded focus:border-red-500 focus:outline-none'
                                    value={guestAddress.fullName}
                                    onChange={e => setGuestAddress({ ...guestAddress, fullName: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className='border border-gray-300 p-3 rounded focus:border-red-500 focus:outline-none'
                                    value={guestAddress.email}
                                    onChange={e => setGuestAddress({ ...guestAddress, email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    className='border border-gray-300 p-3 rounded focus:border-red-500 focus:outline-none'
                                    value={guestAddress.phoneNumber}
                                    onChange={e => setGuestAddress({ ...guestAddress, phoneNumber: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Street Address"
                                    className='border border-gray-300 p-3 rounded focus:border-red-500 focus:outline-none'
                                    value={guestAddress.street}
                                    onChange={e => setGuestAddress({ ...guestAddress, street: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="City"
                                    className='border border-gray-300 p-3 rounded focus:border-red-500 focus:outline-none'
                                    value={guestAddress.city}
                                    onChange={e => setGuestAddress({ ...guestAddress, city: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="District"
                                    className='border border-gray-300 p-3 rounded focus:border-red-500 focus:outline-none'
                                    value={guestAddress.district}
                                    onChange={e => setGuestAddress({ ...guestAddress, district: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    className='border border-gray-300 p-3 rounded focus:border-red-500 focus:outline-none'
                                    value={guestAddress.postalCode}
                                    onChange={e => setGuestAddress({ ...guestAddress, postalCode: e.target.value })}
                                />
                            </div>
                        )}
                    </div>

                    {/* 2. CART ITEMS REVIEW */}
                    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-3 border-l-red-500'>
                        <h3 className='text-lg font-Zalando font-semibold text-gray-700 mb-4'>Review Items</h3>
                        <div className='space-y-6 max-h-125 overflow-y-auto pr-2'>
                            {cartItems.map((item, idx) => {
                                const unitPrice = item.price;
                                const lineTotal = unitPrice * item.quantity;
                                return (
                                    <div key={idx} className='flex gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0'>
                                        <div className='w-20 h-20 bg-gray-100 rounded-md overflow-hidden shrink-0 border border-gray-100'>
                                            <img src={item.image} className='w-full h-full object-cover' alt="" />
                                        </div>
                                        <div className='flex-1 flex flex-col justify-between'>
                                            <div className='flex justify-between items-start'>
                                                <div>
                                                    <p className='font-bold text-gray-800 text-base'>{item.name}</p>
                                                    <p className='text-sm text-gray-500 mt-0.5'><span className='font-semibold'>Size:</span> {item.size}</p>
                                                </div>
                                                <div className='text-right'>
                                                    <p className='font-bold text-gray-900'>${lineTotal.toFixed(2)}</p>
                                                    <button onClick={() => removeFromCart(item.productId, item.size)} className='text-xs text-red-500 hover:underline mt-1'>Remove</button>
                                                </div>
                                            </div>
                                            <div className='flex justify-between items-end mt-2'>
                                                <div className='flex items-center border border-gray-300 rounded-lg h-8'>
                                                    <button onClick={() => decreaseQty(item.productId, item.size)} className='px-3 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100'>
                                                        <FaMinus size={10} />
                                                    </button>
                                                    <span className='w-8 text-center text-sm font-bold text-gray-800'>{item.quantity}</span>
                                                    <button onClick={() => increaseQty(item.productId, item.size)} className='px-3 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100'>
                                                        <FaPlus size={10} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='mt-6 pt-4 border-t border-gray-300'>
                            <label className='flex items-center gap-2 text-sm font-bold text-gray-700 mb-2'><FaRegStickyNote className='text-gray-400' /> Additional Note</label>
                            <textarea value={orderNote} onChange={(e) => setOrderNote(e.target.value)} placeholder='Special instructions...' className='w-full border border-gray-300 rounded-lg p-3 text-sm resize-none h-24 focus:border-red-500 focus:outline-none' />
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT COLUMN ================= */}
                <div className='lg:col-span-1'>
                    <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-24 lg:top-40 border-l-3 ${paymentMethod === 'cod' ? 'border-l-red-500' : 'border-l-purple-500'}`}>
                        <h3 className='text-lg font-Zalando font-semibold text-gray-700 mb-4'>Payment Method</h3>
                        <div className='flex flex-col gap-3 mb-6'>
                            <div onClick={() => setPaymentMethod('cod')} className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-200'}`}>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-red-500' : 'border-gray-400'}`}>
                                    {paymentMethod === 'cod' && <div className='w-2.5 h-2.5 rounded-full bg-red-500' />}
                                </div>
                                <BsCashCoin size={24} className='text-green-600' />
                                <span className='font-medium text-gray-800'>Cash on Delivery</span>
                            </div>
                            <div onClick={() => setPaymentMethod('stripe')} className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === 'stripe' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-200'}`}>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'stripe' ? 'border-purple-500' : 'border-gray-400'}`}>
                                    {paymentMethod === 'stripe' && <div className='w-2.5 h-2.5 rounded-full bg-purple-500' />}
                                </div>
                                <FaRegCreditCard size={22} className='text-amber-600' />
                                <span className='font-medium text-gray-800'>Stripe (Credit Card)</span>
                            </div>
                        </div>

                        <div className='space-y-3 pt-4 border-t border-gray-100'>
                            <div className='flex justify-between text-gray-600'><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                            <div className='flex justify-between text-gray-600'><span>Shipping</span><span>${shippingCost.toFixed(2)}</span></div>
                            <div className='flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200'>
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={globalLoading || (user && addresses.length === 0)}
                            className={`w-full mt-6 py-3.5 rounded-lg font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${paymentMethod === 'stripe' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-red-600 hover:bg-red-700'} ${globalLoading || (user && addresses.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {globalLoading ? <Spinner color='text-white' /> : (paymentMethod === 'stripe' ? 'Pay Now' : 'Place Order')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Address Modal (User Only) */}
            {user && showAddressModal && (
                <AddressModal isOpen={showAddressModal} onClose={handleCloseModal} onSave={handleSaveAddress} addressData={editingAddress} isEditMode={!!editingAddress} />
            )}
        </div>
    )
}

export default Cart