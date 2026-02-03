/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { FaBoxOpen, FaCircle } from "react-icons/fa";
import { orderService } from '../../services/orderService'; // Import Service
import Spinner from '../../components/common/Spinner'; // Assuming you have this
import toast from 'react-hot-toast';

const MyOrders = () => {

   const { navigate, user } = useAppContext()
   const [orders, setOrders] = useState([])
   const [loading, setLoading] = useState(true)

   // ==================== LOAD ORDERS FROM DB ====================
   const fetchOrders = async () => {
      try {
         setLoading(true)
         const data = await orderService.getUserOrders()

         if (data.success) {
            setOrders(data.orders)
         } else {
            toast.error(data.message)
         }
      } catch (error) {
         console.error("Failed to load orders", error)
         toast.error("Failed to load orders")
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      if (user) {
         fetchOrders()
      } else {
         // Optional: If guest functionality is needed here later, 
         // you'd look at localStorage, but 'My Orders' implies logged in.
         setLoading(false);
      }
   }, [user])

   // ==================== HELPER: FORMAT DATE ====================
   const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
   }

   // ==================== HELPER: STATUS COLOR ====================
   const getStatusColor = (status) => {
      switch (status) {
         case 'Delivered': return 'text-green-500';
         case 'Shipped': return 'text-blue-500';
         case 'Cancelled': return 'text-red-500';
         default: return 'text-orange-500'; // Order Placed / Processing
      }
   }

   if (loading) {
      return (
         <div className='min-h-screen flex items-center justify-center pt-20'>
            <Spinner />
         </div>
      )
   }

   return (
      <div className='min-h-screen px-4 md:px-16 lg:px-24 xl:px-32 2xl:px-56 pt-24 lg:pt-40 pb-12 bg-gray-50'>

         <div className='mb-8'>
            <h2 className='text-3xl font-Zalando text-gray-700'>My Orders</h2>
            <p className='text-gray-500 mt-1'>Check the status of recent orders</p>
         </div>

         {/* ==================== EMPTY STATE ==================== */}
         {orders.length === 0 ? (
            <div className='flex flex-col items-center justify-center bg-white p-12 rounded-xl shadow-sm border border-gray-200 min-h-[400px]'>
               <div className='bg-gray-100 p-6 rounded-full mb-4'>
                  <FaBoxOpen size={48} className='text-gray-400' />
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
               {orders.map((order, index) => (
                  <div key={index} className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>

                     {/* --- Order Header --- */}
                     <div className='bg-gray-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-gray-300'>
                        <div className='flex gap-6'>
                           <div className='flex flex-col'>
                              <span className='font-bold text-white'>Order Placed</span>
                              <span>{formatDate(order.date)}</span>
                           </div>
                           <div className='flex flex-col'>
                              <span className='font-bold text-white'>Total</span>
                              <span className='font-semibold text-red-400'>${order.amount.toFixed(2)}</span>
                           </div>
                        </div>
                        <div className='flex flex-col items-start sm:items-end gap-1'>
                           <span className='font-bold text-white'>Order ID: #{order._id.slice(-6).toUpperCase()}</span>
                           <span className='text-xs text-green-400 border border-green-400 px-2 py-0.5 rounded uppercase'>
                              {order.paymentMethod}
                           </span>
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

                              {/* Status & Actions */}
                              <div className='flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4'>

                                 {/* Status Indicator */}
                                 <div className='flex items-center gap-2'>
                                    <FaCircle size={10} className={`${getStatusColor(order.status)}`} />
                                    <span className='font-bold text-gray-700'>{order.status}</span>
                                 </div>

                                 <button className='px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors'>
                                    Track Order
                                 </button>
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

export default MyOrders