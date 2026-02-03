/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productsData } from "../assets/assets";
import toast from "react-hot-toast";
import { authService } from "../services/authService";
import { cartServices } from "../services/cartServices";
import { productServices } from "../services/productServices";

const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()

    // ==================== STATE ====================
    const [user, setUser] = useState(null)
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("")
    const [authLoading, setAuthLoading] = useState(true)
    const [globalLoading, setGlobalLoading] = useState(false)

    // Cart State
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : []
        } catch (error) {
            console.log(error);
            return []
        }
    })

    // ==================== INITIALIZATION ====================
    // Fetch Products (for validation)
    const fetchProducts = async () => {
        try {
            // Fetch fresh data from backend to validate Guest Actions
            const data = await productServices.getShopProducts({});
            if (data.success) setProducts(data.products);
            else setProducts(productsData);
        } catch (error) {
            setProducts(productsData);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);


    // Auth & Cart Load
    useEffect(() => {
        const initAuth = async () => {
            setAuthLoading(true);
            try {
                const response = await authService.getUser();
                if (response.success) {
                    setUser(response.user);
                    await loadUserCart(); // Load from DB
                    localStorage.removeItem('cartItems'); // Clear local if logged in
                } else {
                    setUser(null);
                    // Guest: Cart already loaded from useState init
                }
            } catch (error) {
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        }
        initAuth();
    }, []);

    const loadUserCart = async () => {
        try {
            const data = await cartServices.getCart();
            if (data.success) setCartItems(data.cart);
        } catch (error) {
            console.error("Failed to load cart from DB", error);
        }
    }

    const updateLocalCart = (items) => {
        setCartItems(items);
        localStorage.setItem('cartItems', JSON.stringify(items));
    }


    // --- Helpers ---
    const loadGuestCart = () => {
        try {
            const local = localStorage.getItem('cartItems');
            setCartItems(local ? JSON.parse(local) : []);
        } catch (e) {
            setCartItems([]);
        }
    }

    const fetchUserCart = async () => {
        try {
            const data = await cartServices.getCart();
            if (data.success) setCartItems(data.cart);
        } catch (error) {
            console.error("DB Cart Error", error);
        }
    }

    const saveGuestCart = (items) => {
        setCartItems(items);
        localStorage.setItem('cartItems', JSON.stringify(items));
    }


    // ==================== CART FUNCTIONS ====================

    // --- ADD TO CART ---
    const addToCart = async (product, quantity = 1, size) => {
        if (!size) return toast.error('Please select a size!');

        // --- VALIDATION (Check Stock) ---
        // We use 'products' state (fresh from DB) to validate guest actions
        const freshProduct = products.find(p => p._id === product._id) || product;
        const stockItem = freshProduct.inventory?.find(i => i.size === size);

        if (!stockItem || stockItem.stock < quantity) {
            return toast.error("Sorry, size out of stock!");
        }

        const newItem = {
            productId: product._id,
            name: product.name,
            price: product.discountPrice || product.price, // Use actual current price
            image: product.images[0],
            size,
            quantity
        }

        if (user) {
            // === LOGGED IN: API ===
            try {
                const data = await cartServices.addToCart(newItem);
                if (data.success) {
                    setCartItems(data.cart);
                    toast.success('Added to Cart');
                } else {
                    toast.error(data.message); // Backend validation failed
                }
            } catch (error) {
                toast.error('Failed to add to cart');
            }
        } else {
            // === GUEST: LocalStorage ===
            let currentCart = [...cartItems];
            const index = currentCart.findIndex(i => i.productId === newItem.productId && i.size === size);

            if (index > -1) {
                // Check if adding more exceeds stock limit
                if (currentCart[index].quantity + quantity > stockItem.stock) {
                    return toast.error(`Only ${stockItem.stock} items available!`);
                }
                currentCart[index].quantity += quantity;
                toast.success('Cart updated');
            } else {
                currentCart.push(newItem);
                toast.success('Added to Cart');
            }
            updateLocalCart(currentCart);
        }
    }



    // --- UPDATE QUANTITY ---
    const handleQtyChange = async (productId, size, newQty) => {
        if (user) {
            // === USER: API ===
            try {
                const data = await cartServices.updateCart({ productId, size, quantity: newQty });
                if (data.success) setCartItems(data.cart);
            } catch (error) {
                toast.error('Failed to update cart');
            }
        } else {
            // === GUEST: LocalStorage ===
            // 1. Find product to check stock
            const product = products.find(p => p._id === productId);
            if (product) {
                const stock = product.inventory?.find(i => i.size === size)?.stock || 0;
                if (newQty > stock) return toast.error(`Max stock is ${stock}`);
            }

            const updated = cartItems.map(item =>
                (item.productId === productId && item.size === size)
                    ? { ...item, quantity: newQty }
                    : item
            );
            updateLocalCart(updated);
        }
    }

    const increaseQty = (productId, size) => {
        const item = cartItems.find(i => i.productId === productId && i.size === size);
        if (item) handleQtyChange(productId, size, item.quantity + 1);
    }

    const decreaseQty = (productId, size) => {
        const item = cartItems.find(i => i.productId === productId && i.size === size);
        if (item && item.quantity > 1) handleQtyChange(productId, size, item.quantity - 1);
    }

    // --- REMOVE ---
    const removeFromCart = async (productId, size) => {
        if (user) {
            try {
                const data = await cartServices.updateCart({ productId, size, quantity: 0 });
                if (data.success) {
                    setCartItems(data.cart);
                    toast.success("Item Removed");
                }
            } catch (error) {
                toast.error("Failed to remove item");
            }
        } else {
            const updated = cartItems.filter(i => !(i.productId === productId && i.size === size));
            updateLocalCart(updated);
            toast.success("Item Removed");
        }
    }

    // ==================== 4. DATA REFRESHER (GUEST) ====================
    useEffect(() => {
        if (!user && products.length > 0 && cartItems.length > 0) {
            let hasChanges = false;

            const validatedCart = cartItems.map(item => {
                const dbProduct = products.find(p => p._id === item.productId);

                if (!dbProduct) { hasChanges = true; return null; }

                const dbVariant = dbProduct.inventory?.find(i => i.size === item.size);
                if (!dbVariant) { hasChanges = true; return null; }

                let updatedItem = { ...item };

                // Sync Price
                const currentPrice = dbProduct.discountPrice || dbProduct.price;
                if (item.price !== currentPrice) {
                    updatedItem.price = currentPrice;
                    hasChanges = true;
                }

                // Sync Stock
                if (item.quantity > dbVariant.stock) {
                    updatedItem.quantity = dbVariant.stock;
                    if (updatedItem.quantity === 0) return null;
                    hasChanges = true;
                }

                return updatedItem;
            }).filter(Boolean);

            if (hasChanges) {
                // FIXED HERE: changed saveGuestCart to updateLocalCart
                updateLocalCart(validatedCart);
                toast('Cart updated based on availability', { icon: '⚠️' });
            }
        }
    }, [products]);


    /**
     * Get total number of items in cart
     */
    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    /**
     * Get total price of cart
     */
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.discountPrice || item.price;
            return total + (price * item.quantity);
        }, 0);
    }

    // ==================== AUTH FUNCTIONS ====================

    /**
     * Login user
     */
    const login = async (email, password) => {
        setGlobalLoading(true);
        try {
            const response = await authService.login(email, password);
            if (response.success) {
                setUser(response.user);
                localStorage.setItem('user', JSON.stringify(response.user));

                // NO MERGE: Just switch to DB Cart
                localStorage.removeItem('cartItems');
                await loadUserCart();

                toast.success(`Welcome back!`);
                navigate('/', { replace: true });
                return true;
            } else {
                toast.error(response.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        } finally {
            setGlobalLoading(false);
        }
    }

    /**
     * Register user
     */
    const register = async (name, email, password) => {
        setGlobalLoading(true);
        try {
            const res = await authService.register(name, email, password);
            if (res.success) { toast.success(res.message); return true; }
            else { toast.error(res.message); return false; }
        } catch (e) { toast.error(e.message); return false; } finally { setGlobalLoading(false); }
    }

    /**
     * Verify OTP
     */
    const verifyOTP = async (email, otp) => {
        setGlobalLoading(true);
        try {
            const res = await authService.verifyOTP(email, otp);
            if (res.success) {
                setUser(res.user);
                localStorage.setItem('user', JSON.stringify(res.user));
                toast.success("Verified!");
                await loadUserCart();
                localStorage.removeItem('cartItems');
                navigate('/');
                return true;
            } else { toast.error(res.message); return false; }
        } catch (e) { toast.error(e.message); return false; } finally { setGlobalLoading(false); }
    }

    /**
     * Logout user
     */
    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            localStorage.removeItem('user');
            setCartItems([]);
            localStorage.removeItem('cartItems');
            navigate('/login');
            toast.success('Logged out');
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * Request password reset
     */
    const requestPasswordReset = async (email) => {
        setGlobalLoading(true);
        try {
            const response = await authService.resetPasswordRequest(email);
            if (response.success) {
                navigate('/reset-password', { state: { email } });
                toast.success(response.message);
                return true;
            } else {
                toast.error(response.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        } finally {
            setGlobalLoading(false);
        }
    }

    /**
     * Verify reset OTP
     */
    const verifyResetOtp = async (email, otp) => {
        setGlobalLoading(true);
        try {
            const response = await authService.validateResetOtp(email, otp);
            if (response.success) {
                localStorage.setItem('resetToken', response.resetToken);
                return response;
            } else {
                toast.error(response.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        } finally {
            setGlobalLoading(false);
        }
    }

    /**
     * Reset password with token
     */
    const resetPassword = async (email, newPassword) => {
        const storedToken = localStorage.getItem('resetToken');

        if (!storedToken) {
            toast.error("Session expired, please verify OTP again!");
            return false;
        }

        setGlobalLoading(true);
        try {
            const response = await authService.resetPassword(email, newPassword, storedToken);
            if (response.success) {
                toast.success(response.message);
                localStorage.removeItem('resetToken');
                navigate('/login');
                return true;
            } else {
                toast.error(response.message);
                return false;
            }
        } catch (error) {
            console.error('Reset error:', error);
            toast.error(error.message);
            return false;
        } finally {
            setGlobalLoading(false);
        }
    }

    // ==================== INIT EFFECTS ====================
    useEffect(() => {
        fetchProducts();
    }, []);

    // Sync localStorage for guests (logged-in users use DB only)
    useEffect(() => {
        if (!user) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, user]);

    // ==================== CONTEXT VALUE ====================
    const value = {
        // Products
        products,

        // Navigation
        navigate,

        // Search
        searchQuery,
        setSearchQuery,

        // Cart
        cartItems,
        setCartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        getCartCount,
        getCartTotal,

        // Loading states
        authLoading,
        setAuthLoading,
        globalLoading,
        setGlobalLoading,

        // Auth
        user,
        login,
        register,
        verifyOTP,
        logout,
        requestPasswordReset,
        resetPassword,
        verifyResetOtp
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);