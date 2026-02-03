import React, { useState } from 'react'
import { IoIosEye, IoIosEyeOff, IoIosMail } from "react-icons/io";
import { FaUnlockAlt, FaUser } from "react-icons/fa";
import { assets } from '../../assets/assets'; // Background image
import { useAppContext } from '../../context/AppContext';
import VerifyOtp from '../../components/shop/VerifyOtp'; // Import OTP Modal
import { Navigate } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';


const Auth = () => {
  const { user, authLoading, globalLoading, login, register, verifyOTP, navigate } = useAppContext()


  // State
  const [state, setState] = useState('login') // 'login' | 'signup'
  const [showOtpModal, setShowOtpModal] = useState(false)

  // Form Data
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})

  // Hide login page if already logged
  if (!authLoading && user) {
    //if (user.role === 'admin') return <Navigate to='/admin' replace />
    return <Navigate to='/' replace />
  }


  // Toggle Login/Signup
  const handleStatus = () => {
    setState(prev => prev === 'login' ? 'signup' : 'login')
    setErrors({})
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
  }

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  // Validate
  const validateForm = () => {
    const newErrors = {}
    if (state === 'signup' && !formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = 'Password is required'
    if (state === 'signup' && formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    if (state === 'login') {
      await login(formData.email, formData.password)
    } else {
      const success = await register(formData.name, formData.email, formData.password)
      if (success) setShowOtpModal(true) // Show OTP Modal on success
    }
  }

  // Handle OTP Verify
  const handleOtpSubmit = async (email, otp) => {

    const success = await verifyOTP(formData.email, otp)
    if (success) setShowOtpModal(false)
  }

  return (
    <div
      className='relative min-h-screen flex items-center justify-center bg-center bg-cover px-6 md:px-16 lg:px-24 xl:px-32 pt-20 md:pt-24 pb-16'
    >

      {/* OTP MODAL OVERLAY */}
      {showOtpModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4'>
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative border-t-4 border-t-red-500">
            <button onClick={() => setShowOtpModal(false)} className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-red-500">&times;</button>
            <h3 className='text-center text-2xl p-2 text-red-500 font-Zalando font-medium'>Verify your Email</h3>
            <VerifyOtp
              title="Verify Email"
              email={formData.email}
              onSubmit={handleOtpSubmit}
              purpose="Verify & Login"
            />
          </div>
        </div>
      )}

      {/* AUTH CARD */}
      <div className='relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border-t-4 border-red-500'>
        <div className='p-8'>
          <div className='text-center mb-8'>
            <img src={assets.logo} alt="Logo" className='w-24 mx-auto mb-2' />
            <h2 className='text-2xl font-bold text-gray-800 font-Zalando'>
              {state === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            {state === 'signup' && (
              <div className='relative'>
                <FaUser className='absolute left-3 top-3.5 text-gray-400' />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 p-3 border text-sm md:text-base rounded-lg outline-none focus:border-red-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name}</p>}
              </div>
            )}

            <div className='relative'>
              <IoIosMail className='absolute left-3 top-3.5 text-gray-400' size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 p-3 text-sm md:text-base border rounded-lg outline-none focus:border-red-500 
                                ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
            </div>

            <div className='relative'>
              <FaUnlockAlt className='absolute left-3 top-3.5 text-gray-400' />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}

                className={`w-full pl-10 pr-10 p-3 border text-sm md:text-base rounded-lg outline-none focus:border-red-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-3.5 text-gray-400'>{showPassword ? <IoIosEyeOff /> : <IoIosEye />}</button>
              {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password}</p>}
            </div>

            {state === 'signup' && (
              <div className='relative'>
                <FaUnlockAlt className='absolute left-3 top-3.5 text-gray-400' />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 p-3 text-sm md:text-base border rounded-lg outline-none focus:border-red-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute right-3 top-3.5 text-gray-400'>{showConfirmPassword ? <IoIosEyeOff /> : <IoIosEye />}</button>
                {errors.confirmPassword && <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword}</p>}
              </div>
            )}

            {state === 'login' && (
              <p onClick={() => navigate('/reset-password')} className='text-right text-sm text-blue-600 hover:underline cursor-pointer font-medium'>Forgot Password?</p>
            )}

            <button
              disabled={globalLoading}
              className={`flex items-center justify-center ${globalLoading ? 'bg-gray-400' : 'bg-red-500'} text-white font-bold py-3 rounded-lg hover:bg-red-600 transition shadow-lg mt-2 active:scale-95 transform`}
            >
              {globalLoading ? (<Spinner />) : (state === 'login' ? 'Login' : 'Sign Up')}

            </button>
          </form>

          <div className='mt-6 text-center text-sm text-gray-600'>
            <p>
              {state === 'login' ? "Don't have an account?" : "Already have an account?"}
              <span onClick={handleStatus} className='ml-1 text-red-500 font-bold cursor-pointer hover:underline'>
                {state === 'login' ? 'Register' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth