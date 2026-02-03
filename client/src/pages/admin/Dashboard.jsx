import React from 'react'
import { FaChartLine, FaShoppingCart, FaUsers, FaBoxOpen, FaEllipsisV } from 'react-icons/fa'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const Dashboard = () => {

  // --- 1. STATS DATA ---
  const stats = [
    { label: 'Today Revenue', value: '$12,450', change: '+12.5%', icon: <FaChartLine />, color: 'text-blue-400', bg: 'bg-blue-900/30', border:'border-l-blue-500' },
    { label: 'Today Orders', value: '1,248', change: '+8.2%', icon: <FaShoppingCart />, color: 'text-green-400', bg: 'bg-green-900/30' , border:'border-l-green-500' },
    { label: 'Total Users', value: '542', change: '+5.3%', icon: <FaUsers />, color: 'text-purple-400', bg: 'bg-purple-900/30', border:'border-l-purple-500' },
    { label: 'Total Products', value: '856', change: '+2.1%', icon: <FaBoxOpen />, color: 'text-orange-400', bg: 'bg-orange-900/30', border:'border-l-orange-500' },
  ]

  // --- 2. CHART DATA ---
  const monthlyData = [
    { name: 'Jan', orders: 4000, revenue: 2400 }, { name: 'Feb', orders: 3000, revenue: 1398 },
    { name: 'Mar', orders: 2000, revenue: 9800 }, { name: 'Apr', orders: 2780, revenue: 3908 },
    { name: 'May', orders: 1890, revenue: 4800 }, { name: 'Jun', orders: 2390, revenue: 3800 },
    { name: 'Jul', orders: 2390, revenue: 2800 }, { name: 'Aug', orders: 2390, revenue: 3000 },
    { name: 'Sep', orders: 2390, revenue: 1800 }, { name: 'Oct', orders: 2390, revenue: 2000 },
    { name: 'Nov', orders: 2390, revenue: 5000 }, { name: 'Dec', orders: 2390, revenue: 5800 },
  ]

  const userTypeData = [
    { name: 'Registered Users', value: 400 },
    { name: 'Guest Users', value: 300 },
  ];

  // --- 3. RECENT ORDERS DATA (Industry Standard: Status & Amount) ---
  const recentOrders = [
    { id: '#ORD-7752', user: 'John Doe', date: '2 min ago', amount: '$120.50', status: 'Pending' },
    { id: '#ORD-7751', user: 'Sarah Smith', date: '15 min ago', amount: '$85.00', status: 'Shipped' },
    { id: '#ORD-7750', user: 'Mike Jones', date: '1 hour ago', amount: '$210.20', status: 'Delivered' },
    { id: '#ORD-7749', user: 'Emily Davis', date: '3 hours ago', amount: '$45.00', status: 'Cancelled' },
    { id: '#ORD-7748', user: 'David Lee', date: '5 hours ago', amount: '$600.00', status: 'Pending' },
  ]

  // --- 4. TOP PRODUCTS (Real World Idea: Best Sellers) ---
  const topProducts = [
    { name: 'Nike Air Max 270', sales: 124, revenue: '$14,880' },
    { name: 'Adidas Ultraboost', sales: 98, revenue: '$17,640' },
    { name: 'Puma RS-X', sales: 75, revenue: '$8,250' },
    { name: 'New Balance 574', sales: 62, revenue: '$5,580' },
  ]

  // --- 5. RECENT USERS ---
  const recentUsers = [
    { name: 'Alice Walker', email: 'alice@example.com', role: 'User' },
    { name: 'Robert Brown', email: 'robert@example.com', role: 'Admin' },
    { name: 'Charlie Green', email: 'charlie@example.com', role: 'User' },
  ]

  const COLORS = ['#0066ff', '#33cc33'];

  return (
    <div className='max-w-7xl w-full mx-auto text-gray-200 pb-10'>
      
      {/* HEADER */}
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-semibold font-Zalando text-red-500 mb-2'>Dashboard</h1>
        <p className='text-gray-400'>Welcome back! Here's your store overview.</p>
      </div>

      {/* STATS */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg flex items-center justify-between 
            hover:scale-105 transition-transform duration-300 border-l-3 border-l-red-500`}
          >
            <div>
              <p className='text-gray-400 text-sm font-medium uppercase'>{stat.label}</p>
              <h3 className='text-2xl font-bold text-white mt-1'>{stat.value}</h3>
              <p className='text-green-400 text-xs font-semibold mt-1'>{stat.change} vs last month</p>
            </div>
            <div className={`p-4 rounded-full ${stat.bg} ${stat.color} text-xl`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
        {/* Bar Chart */}
        <div className='lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg border-l-3 border-l-red-500'>
            <h3 className='font-semibold text-lg text-white mb-6 pl-2 border-l-4 border-red-500'>Monthly Orders & Revenue</h3>
            <div className='w-full h-80'>
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" tick={{fill: '#9CA3AF'}} />
                    <YAxis stroke="#9CA3AF" tick={{fill: '#9CA3AF'}} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
                    <Legend />
                    <Bar dataKey="orders" fill="#33cc33" name="Total Orders" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="revenue" fill="#0066ff" name="Revenue ($)" radius={[4, 4, 0, 0]} />
                  </BarChart>
              </ResponsiveContainer>
            </div>
        </div>

        {/* Pie Chart */}
        <div className='bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg flex flex-col border-l-3 border-l-red-500'>
            <h3 className='font-semibold text-lg text-white mb-6 pl-2 border-l-4 border-red-500'>Order Distribution</h3>
            <div className='w-full flex-1 min-h-75'>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={userTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} fill="#8884d8" paddingAngle={5} dataKey="value" label>
                    {userTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* === NEW SECTION: DATA TABLES === */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        
        {/* RECENT ORDERS (Takes 2 columns) */}
        <div className='lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden border-l-3 border-l-red-500'>
            <div className='p-6 border-b border-gray-700 flex justify-between items-center'>
                <h3 className='font-semibold text-lg text-white'>Recent Orders</h3>
                <button className='text-sm text-blue-400 hover:text-blue-300'>View All</button>
            </div>
            <div className='overflow-x-auto'>
                <table className='w-full text-left'>
                    <thead className='bg-gray-700/50 text-gray-400 text-xs uppercase'>
                        <tr>
                            <th className='px-6 py-3'>Order ID</th>
                            <th className='px-6 py-3'>Customer</th>
                            <th className='px-6 py-3'>Status</th>
                            <th className='px-6 py-3'>Amount</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-700 text-gray-300 text-sm'>
                        {recentOrders.map((order, i) => (
                            <tr key={i} className='hover:bg-gray-700/30 transition-colors'>
                                <td className='px-6 py-4 font-medium text-white'>{order.id}</td>
                                <td className='px-6 py-4'>
                                    <p className='text-white'>{order.user}</p>
                                    <p className='text-xs text-gray-500'>{order.date}</p>
                                </td>
                                <td className='px-6 py-4'>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                                        order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                                        order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-red-500/20 text-red-400'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className='px-6 py-4 font-semibold text-white'>{order.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* RIGHT COLUMN: TOP PRODUCTS & USERS */}
        <div className='flex flex-col gap-8'>
            
            {/* TOP SELLING PRODUCTS */}
            <div className='bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6 border-l-3 border-l-red-500'>
                <h3 className='font-semibold text-lg text-white mb-4'>Top Selling Products</h3>
                <div className='flex flex-col gap-4'>
                    {topProducts.map((product, index) => (
                        <div key={index} className='flex items-center justify-between p-3 bg-gray-700/30 rounded-lg'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 bg-gray-700 rounded-md flex items-center justify-center text-gray-400'>
                                    <FaBoxOpen />
                                </div>
                                <div>
                                    <p className='text-sm font-medium text-white'>{product.name}</p>
                                    <p className='text-xs text-gray-400'>{product.sales} Sales</p>
                                </div>
                            </div>
                            <span className='text-sm font-bold text-green-400'>{product.revenue}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* RECENT USERS */}
            <div className='bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6 border-l-3 border-l-red-500'>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className='font-semibold text-lg text-white'>New Users</h3>
                    <FaEllipsisV className='text-gray-500 cursor-pointer' />
                </div>
                <div className='flex flex-col gap-4'>
                    {recentUsers.map((user, index) => (
                        <div key={index} className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-full bg-linear-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold'>
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <p className='text-sm font-medium text-white'>{user.name}</p>
                                <p className='text-xs text-gray-400'>{user.email}</p>
                            </div>
                            <span className='ml-auto text-xs bg-gray-700 px-2 py-1 rounded text-gray-300'>{user.role}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>

      </div>
    </div>
  )
}

export default Dashboard