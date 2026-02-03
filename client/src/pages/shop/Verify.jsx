/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import Spinner from '../../components/common/Spinner'

const Verify = () => {
    // 1. Get 'user' from context to check if logged in
    const { navigate, setCartItems, user } = useAppContext()
    const [searchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    useEffect(() => {
        if (success === 'true') {
            // Payment Succeeded
            setCartItems([])
            localStorage.removeItem('cartItems')
            toast.success("Payment Successful!")

            // 2. Smart Redirect
            if (user) {
                navigate('/my-orders')
            } else {
                navigate('/guest-orders') // Redirect guests here
            }

        } else {
            // Payment Failed
            toast.error("Payment Failed")
            navigate('/cart')
        }
    }, [])

    return (
        <div className='min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-gray-50'>
            <Spinner />
            <p className='text-gray-500 font-medium animate-pulse'>Verifying Payment...</p>
        </div>
    )
}

export default Verify