import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { FaTachometerAlt, FaBoxOpen, FaThList, FaPlusSquare, FaClipboardList, FaUsers, FaSignOutAlt } from 'react-icons/fa'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose }) => {

    const { navigate, logout } = useAppContext()

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: <FaTachometerAlt /> },
        { name: 'Add Product', path: '/admin/add-product', icon: <FaPlusSquare /> },
        { name: 'All Products', path: '/admin/all-products', icon: <FaThList /> },
        { name: 'Orders', path: '/admin/orders', icon: <FaClipboardList /> },
        { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    ]

    const handleNavClick = () => {
        if (onClose) onClose()
    }

    return (
        <>
            {/* =========== MOBILE BACKGROUND OVERLAY ===========*/}
            {isOpen && (
                <div
                    className='fixed inset-0 bg-black/50 z-30 xl:hidden'
                    onClick={onClose}
                />
            )}

            {/* =========== SIDEBAR ===========*/}
            <div
                className={`fixed xl:relative left-0 min-h-screen xl:min-h-[90vh] top-0 z-40 bg-gray-950 border border-red-400 rounded-tr-3xl rounded-br-3xl xl:rounded-none
                            flex flex-col shadow-lg shadow-red-500 transform transition-transform duration-300 ease-in-out
                            w-64 lg:w-72 -translate-x-full xl:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >

                {/* --- LOGO AREA --- */}
                <div className='h-20 flex items-center justify-between border-b border-gray-600 px-6'>
                    <div
                        className='w-20 cursor-pointer'
                        onClick={() => navigate('/')}
                    >
                        <img src={assets.footer_logo} alt="" className='w-full' />
                    </div>

                    <div className='flex flex-col items-end '>
                        <h1 className='text-2xl font-semibold font-Zalando text-red-500'>ADMIN</h1>
                        <p className='text-xs text-gray-300'>Control Panel</p>
                    </div>
                </div>

                <div className='px-6 py-4 flex-1'>
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/admin'}
                            onClick={handleNavClick}
                            title={item.name}
                            className={({ isActive }) => `
                                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium my-2
                                        text-gray-200 group relative 
                                        ${isActive
                                    ? 'bg-red-500 border-l-3 '
                                    : 'hover:text-white hover:bg-gray-600/50'
                                }
                                         `}
                        >
                            <span className='text-lg shrink-0'>{item.icon}</span>
                            <span className='text-sm md:text-base whitespace-nowrap'>{item.name}</span>
                        </NavLink>
                    ))}
                </div>

                <div className='text-white p-4 border-t border-gray-600 mb-16 '>
                    <button
                        onClick={() => { handleNavClick(); logout() }}
                        className='w-full border border-red-500 hover:bg-red-500 cursor-pointer transition-colors rounded px-4 py-2 flex items-center justify-center gap-2'
                    >
                        <FaSignOutAlt size={24} />
                        <span className=''>Logout</span>
                    </button>
                </div>


            </div>


        </>
    )
}

export default Sidebar
