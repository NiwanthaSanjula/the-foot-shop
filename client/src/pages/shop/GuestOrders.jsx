/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { FaBoxOpen, FaCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const GuestOrders = () => {

  const { navigate } = useAppContext()
  const [GuestOrders, setGuestOrders] = useState([])

  // ==================== LOAD ORDERS ====================
  // We simulate a backend by reading 'myOrders' from localStorage.
  // In a real app, this would be: const { data } = await axios.get('/api/orders/myorders')
  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('GuestOrders')) || []
      // Sort items: Newest first based on date
      const sortedOrders = savedOrders.sort((a, b) => new Date(b.date) - new Date(a.date))
      setGuestOrders(sortedOrders)
      
    } catch (error) {
      console.error("Failed to load orders", error)
    }
  }, [])

  // ==================== HELPER: FORMAT DATE ====================
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }


  return (
    <div className='min-h-screen px-4 md:px-16 lg:px-24 xl:px-32 2xl:px-56 pt-24 lg:pt-40 pb-12 bg-gray-50'>
      
      {/* Page Title */}
      <div className='mb-8'>
        <h2 className='text-3xl font-Zalando text-gray-700'>My Orders</h2>
        <p className='text-gray-500 mt-1'>Check the status of recent orders</p>
      </div>

      {/* ==================== EMPTY STATE ==================== */}
      {GuestOrders.length === 0 ? (
        <div className='flex flex-col items-center justify-center bg-white p-12 rounded-xl shadow-sm border border-gray-200 min-h-100'>
           <div className='bg-gray-100 p-6 rounded-full mb-4'>
              <FaBoxOpen size={48} className='text-gray-400'/>
           </div>
           <h3 className='text-xl font-Zalando text-gray-700'>No orders yet</h3>
           <p className='text-gray-500 mb-6'>Looks like you haven't placed an order yet.</p>
           <button 
              onClick={() => navigate('/shop')}
              className='px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-all'
           >
              Start Shopping
           </button>
        </div>
      ) : (
        /* ==================== ORDERS LIST ==================== */
        <div className='flex flex-col gap-6'>
          {GuestOrders.map((order, index) => (
            <div key={index} className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden '>
              
              {/* --- Order Header --- */}
              <div className='bg-linear-to-r from-gray-800 to-gray-600 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-gray-600'>
                 <div className='flex gap-6'>
                    <div className='flex flex-col text-gray-300'>
                       <span className='font-bold'>Order Placed</span>
                       <span>{formatDate(order.date)}</span>
                    </div>
                    <div className='flex flex-col text-gray-300'>
                       <span className='font-bold '>Total</span>
                       <span className='font-semibold text-red-500'>${order.amount.toFixed(2)}</span>
                    </div>
                 </div>
                 <div className='flex flex-col items-start gap-1 sm:items-end text-gray-300'>
                    <span className='font-bold '>Order ID # {order.date.slice(-6).toUpperCase()}{index}</span> {/* Mock ID */}
                    <span className='text-xs text-green-500 border px-2 py-1 w-full flex items-center justify-center rounded'>Method: {order.paymentMethod.toUpperCase()}</span>
                 </div>
              </div>

              {/* --- Order Items & Status --- */}
              <div className='p-6'>
                 {order.items.map((item, i) => (
                    <div key={i} className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-4 border-b border-gray-100 last:border-0'>
                        
                        {/* Product Info */}
                        <div className='flex items-start gap-4 flex-1'>
                           <img src={item.image} alt={item.name} className='w-20 h-20 object-cover rounded-md bg-gray-100 border border-gray-200' />
                           <div>
                              <h4 className='font-bold text-gray-800 text-base md:text-lg line-clamp-1'>{item.name}</h4>
                              <div className='flex items-center gap-3 text-sm text-gray-500 mt-1'>
                                 <span className='bg-gray-100 px-2 py-0.5 rounded'>Size: {item.size}</span>
                                 <span className='bg-gray-100 px-2 py-0.5 rounded'>Qty: {item.quantity}</span>
                              </div>
                              <p className='text-sm font-semibold text-gray-900 mt-2'>${item.price}</p>
                           </div>
                        </div>
                    </div>
                 ))}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default GuestOrders