/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { FaSearch, FaBoxOpen, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { orderService } from '../../services/orderService'
import Spinner from '../../components/common/Spinner'
import toast from 'react-hot-toast'
import { FormHeader, FormSection } from '../../components/admin/FormComponents'

const STATUS_OPTIONS = ["All", "Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered", "Cancelled"]

const Orders = () => {

  const [allOrders, setAllOrders] = useState([])
  const [displayedOrders, setDisplayedOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // Filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // Pagination
  const [page, setPage] = useState(1)
  const limit = 5 // Showing fewer items per page since cards are large
  const [totalPages, setTotalPages] = useState(1)

  // ==================== FETCH DATA ====================
  const fetchOrders = async () => {
    setLoading(true)
    try {
      const data = await orderService.getAllOrders()
      if (data.success) {
        setAllOrders(data.orders)
      } else {
        toast.error("Failed to fetch orders")
      }
    } catch (error) {
      console.error(error)
      toast.error("Error loading orders")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // ==================== FILTER & PAGINATION LOGIC ====================
  useEffect(() => {
    let result = [...allOrders];

    if (statusFilter !== 'All') {
      result = result.filter(order => order.status === statusFilter);
    }

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(order =>
        order._id.toLowerCase().includes(lowerSearch) ||
        order.address.fullName.toLowerCase().includes(lowerSearch)
      );
    }

    setTotalPages(Math.ceil(result.length / limit) || 1);

    const startIndex = (page - 1) * limit;
    setDisplayedOrders(result.slice(startIndex, startIndex + limit));

  }, [allOrders, search, statusFilter, page]);

  // ==================== HANDLERS ====================
  const handleStatusUpdate = async (e, orderId) => {
    const newStatus = e.target.value;
    try {
      // Optimistic Update
      setAllOrders(prev => prev.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      ));

      const response = await orderService.updateStatus(orderId, newStatus);
      if (response.success) {
        toast.success(`Status updated to ${newStatus}`);
      } else {
        fetchOrders();
        toast.error("Update failed");
      }
    } catch (error) {
      console.log(error);
      fetchOrders();
      toast.error("Error updating status");
    }
  }

  // ==================== HELPERS ====================
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  // Dark Mode Status Colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Packing': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Shipped': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'Out for delivery': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Delivered': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-700 border-gray-600';
    }
  }

  return (
    <div className='max-w-7xl mx-auto pb-10'>
      <FormHeader title="Orders" subtitle="Track and manage customer orders" />

      <div className='flex flex-col gap-6'>

        {/* === 1. FILTERS SECTION === */}
        <FormSection>
          <div className='flex flex-col lg:flex-row gap-4 items-center lg:justify-between'>
            <div className='relative w-full lg:w-96'>
              <input
                type="text"
                placeholder="Search Order # or Customer..."
                className='w-full bg-gray-700 text-white pl-10 pr-4 py-2.5 rounded-lg border border-gray-600 focus:ring-red-500 focus:border-red-500 outline-none transition-all'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='w-full lg:w-auto bg-gray-700 text-white px-4 py-2.5 rounded-lg border border-gray-600 outline-none cursor-pointer hover:bg-gray-600 transition-colors'
            >
              {STATUS_OPTIONS.map(status => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
        </FormSection>

        {/* === 2. ORDERS LIST === */}
        {loading ? (
          <div className='flex flex-col items-center justify-center py-20'>
            <Spinner />
            <p className='text-gray-400 mt-4 animate-pulse'>Loading Orders...</p>
          </div>
        ) : displayedOrders.length === 0 ? (
          <div className='text-center py-20 bg-gray-800 rounded-xl border border-gray-700'>
            <div className='text-5xl mb-4 opacity-20 text-gray-400 flex justify-center'><FaBoxOpen /></div>
            <p className='text-gray-400'>No orders found.</p>
            <button onClick={() => { setSearch(''); setStatusFilter('All') }} className='mt-2 text-red-400 hover:underline text-sm'>Clear Filters</button>
          </div>
        ) : (
          <div className='flex flex-col gap-6'>
            {displayedOrders.map((order) => (
              <div key={order._id} className='bg-gray-800 border border-gray-700 border-l-3 border-l-red-500 rounded-xl shadow-lg overflow-hidden'>

                {/* --- ORDER HEADER --- */}
                <div className='bg-gray-900/50 px-6 py-4 border-b border-gray-700 flex flex-wrap justify-between items-center gap-4'>
                  <div className='flex items-center gap-4'>
                    <div className='bg-gray-800 p-3 rounded-full border border-gray-700'>
                      <FaBoxOpen className='text-red-500 text-xl' />
                    </div>
                    <div>
                      <p className='font-bold text-white font-mono text-lg'>#{order._id.slice(-6).toUpperCase()}</p>
                      <div className='flex items-center gap-2 text-xs text-gray-400 mt-0.5'>
                        <FaCalendarAlt /> {formatDate(order.date)}
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-6'>
                    <div className='text-right hidden sm:block'>
                      <p className='text-xs text-gray-500 uppercase tracking-wide'>Payment</p>
                      <p className='font-bold text-gray-300 uppercase'>{order.paymentMethod}</p>
                    </div>
                    <div className='text-right border-l border-gray-700 pl-6'>
                      <p className='text-xs text-gray-500 uppercase tracking-wide'>Total</p>
                      <p className='font-bold text-red-400 text-xl'>${order.amount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* --- ORDER BODY --- */}
                <div className='p-6 grid grid-cols-1 lg:grid-cols-2 gap-8'>

                  {/* LEFT: ITEMS LIST */}
                  <div className='space-y-4'>
                    <h4 className='text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>Items ({order.items.length})</h4>
                    <div className='flex flex-col gap-3'>
                      {order.items.map((item, index) => (
                        <div key={index} className='flex items-center gap-4 bg-gray-700/30 p-3 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors'>
                          <img src={item.image} alt={item.name} className='w-12 h-12 object-cover rounded bg-gray-800 border border-gray-600' />
                          <div className='flex-1 min-w-0'>
                            <p className='font-medium text-gray-200 line-clamp-1'>{item.name}</p>
                            <div className='flex items-center gap-3 text-xs text-gray-400 mt-1'>
                              <span className='bg-gray-700 px-1.5 py-0.5 rounded'>Size: {item.size}</span>
                              <span className='bg-gray-700 px-1.5 py-0.5 rounded'>Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <div className='text-sm font-mono text-gray-300'>${item.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT: ADDRESS & ACTION */}
                  <div className='flex flex-col justify-between gap-6'>
                    {/* Address Card */}
                    <div className='bg-gray-700/20 p-4 rounded-lg border border-gray-700'>
                      <h4 className='text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2'>
                        <FaMapMarkerAlt /> Shipping Details
                      </h4>
                      <div className='text-sm text-gray-300 space-y-1 pl-1'>
                        <p className='font-bold text-white text-base'>{order.address.fullName}</p>
                        <p>{order.address.street}</p>
                        <p>{order.address.city}, {order.address.district} - {order.address.postalCode}</p>
                        <p className='text-xs mt-2 text-gray-400 pt-2 border-t border-gray-700'>📞 {order.address.phoneNumber}</p>
                      </div>
                    </div>

                    {/* Status Controller */}
                    <div>
                      <h4 className='text-xs font-bold text-gray-500 uppercase tracking-wider mb-2'>Update Status</h4>
                      <select
                        onChange={(e) => handleStatusUpdate(e, order._id)}
                        value={order.status}
                        className={`w-full p-3 rounded-lg border outline-none cursor-pointer text-sm font-bold appearance-none text-center transition-all ${getStatusColor(order.status)}`}
                      >
                        {STATUS_OPTIONS.filter(s => s !== 'All').map(status => (
                          <option key={status} value={status} className='bg-gray-800 text-gray-300 py-2'>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* === 3. PAGINATION === */}
        {totalPages > 1 && (
          <FormSection>
            <div className='flex justify-between items-center w-full'>
              <span className='text-sm text-gray-400'>
                Page <span className='text-white font-medium'>{page}</span> of <span className='text-white font-medium'>{totalPages}</span>
              </span>
              <div className='flex gap-2'>
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className='px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm font-medium'
                >
                  <FaChevronLeft size={12} /> Previous
                </button>
                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className='px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm font-medium'
                >
                  Next <FaChevronRight size={12} />
                </button>
              </div>
            </div>
          </FormSection>
        )}
      </div>
    </div>
  )
}

export default Orders