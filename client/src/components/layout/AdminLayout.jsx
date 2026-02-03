import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../admin/Sidebar'
import { FaBars } from 'react-icons/fa'

const AdminLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  return (
    <div className='flex flex-col xl:flex-row min-h-screen bg-linear-180 from-gray-800 to-gray-950'>

      { /* Mobile Header */ }
      <div className='xl:hidden bg-red-500 px-4 py-2 flex items-center justify-between gap-3 sticky top-0 z-20 '>
        <button
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars size={24} className='text-white cursor-pointer' />
        </button>

        <h1 className=' font-Zalando font-semibold text-white'>
          Admin Panel
        </h1>

      </div>

      <Sidebar
        isOpen = {sidebarOpen}
        onClose = {() => setSidebarOpen(false)}
      />
      
      <main className='flex-1 h-screen overflow-y-auto'>
        <div className='py-6 px-4 '>
          <Outlet />
        </div>
      </main>

    </div>
  )
}

export default AdminLayout
