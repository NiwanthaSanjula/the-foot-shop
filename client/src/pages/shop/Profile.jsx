/* eslint-disable react-hooks/set-state-in-effect */

import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { FaUserCircle, FaBoxOpen, FaHeart, FaSignOutAlt, FaMapMarkerAlt, FaEdit, FaCheck } from 'react-icons/fa'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user, setUser, logout, navigate } = useAppContext()

  // Local state for editing profile
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState('')

  // Protect Route & Load Data
  useEffect(() => {
    if (!user) {
        navigate('/login')
    } else {
        setTempName(user.name)
    }
  }, [user, navigate])

  // Handle Profile Update (Mock)
  const handleUpdateProfile = () => {
    if(!tempName.trim()) return toast.error("Name cannot be empty")
    
    // Update Context & LocalStorage
    const updatedUser = { ...user, name: tempName }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    setIsEditing(false)
    toast.success("Profile updated successfully")
  }

  if (!user) return null;

  return (
    <div className='min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-56 pt-32 lg:pt-42 pb-12 bg-gray-50 flex justify-center items-start'>

        <div className='w-full max-w-4xl flex flex-col gap-6'>
            
            {/* === SECTION 1: USER INFO CARD === */}
            <div className='bg-white border border-gray-200 shadow-sm rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6'>
                
                <div className='flex flex-col md:flex-row items-center gap-6'>
                    {/* Avatar */}
                    <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400'>
                        <FaUserCircle size={96} />
                    </div>

                    {/* Details */}
                    <div className='text-center md:text-left'>
                        <div className='flex items-center justify-center md:justify-start gap-3 mb-1'>
                            {isEditing ? (
                                <>
                                    <input 
                                        type="text" 
                                        value={tempName}
                                        onChange={(e) => setTempName(e.target.value)}
                                        className='border border-gray-300 rounded px-2 py-1 text-lg font-bold text-gray-800 outline-none focus:border-red-500 w-full md:w-auto'
                                        autoFocus
                                    />
                                    <button 
                                        onClick={handleUpdateProfile}
                                        className='text-green-500 hover:text-green-600 bg-green-50 p-2 rounded-full transition'
                                    >
                                        <FaCheck size={16}/>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h2 className='text-2xl font-bold text-gray-800'>{user.name}</h2>
                                    <button 
                                        onClick={() => setIsEditing(true)}
                                        className='text-gray-400 hover:text-red-500 transition'
                                    >
                                        <FaEdit size={18}/>
                                    </button>
                                </>
                            )}
                        </div>
                        <p className='text-gray-500 font-medium'>{user.email}</p>
                        <p className='text-xs text-gray-400 mt-1 uppercase tracking-wide'>{user.role}</p>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className='flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-500 font-bold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-100'
                >
                    <FaSignOutAlt /> Logout
                </button>
            </div>

            {/* === SECTION 2: DASHBOARD WIDGETS === */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                
                {/* My Orders */}
                <div 
                    onClick={() => navigate('/my-orders')}
                    className='bg-white border border-gray-200 shadow-sm p-6 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group'
                >
                    <div className='w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors'>
                        <FaBoxOpen size={28} />
                    </div>
                    <h3 className='font-bold text-lg text-gray-800'>My Orders</h3>
                    <p className='text-gray-400 text-sm'>Track & Return</p>
                </div>

                {/* Wishlist */}
                <div 
                    onClick={() => navigate('/wishlist')} // You need to create this route next
                    className='bg-white border border-gray-200 shadow-sm p-6 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-pink-500 hover:shadow-md transition-all group'
                >
                    <div className='w-14 h-14 bg-pink-50 rounded-full flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors'>
                        <FaHeart size={28} />
                    </div>
                    <h3 className='font-bold text-lg text-gray-800'>Wishlist</h3>
                    <p className='text-gray-400 text-sm'>Your Favorites</p>
                </div>

                {/* Addresses */}
                <div 
                    onClick={() => navigate('/cart')} // Or create a dedicated /addresses page
                    className='bg-white border border-gray-200 shadow-sm p-6 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-green-500 hover:shadow-md transition-all group'
                >
                    <div className='w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors'>
                        <FaMapMarkerAlt size={28} />
                    </div>
                    <h3 className='font-bold text-lg text-gray-800'>Addresses</h3>
                    <p className='text-gray-400 text-sm'>Manage Delivery</p>
                </div>

            </div>

        </div>
    </div>
  )
}

export default Profile