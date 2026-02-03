import React, { useState } from 'react'
import { IoIosEye, IoIosEyeOff, IoIosMail } from "react-icons/io";
import { FaUnlockAlt, FaArrowLeft } from "react-icons/fa";
import toast from 'react-hot-toast'
import VerifyOtp from '../../components/shop/VerifyOtp';
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets';
import Spinner from '../../components/common/Spinner';

const ForgotPassword = () => {
  const { navigate, requestPasswordReset, verifyResetOtp, resetPassword, globalLoading } = useAppContext()

  const [step, setStep] = useState('email') // email -> otp -> password
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  // 1. Send OTP
  const handleEmailSubmit = async (e) => {
        e.preventDefault()
        if(!email) return toast.error("Email required")
     
        const success = await requestPasswordReset(email)

        if (success) {
            setStep('otp')
        }
  }

  // 2. Verify OTP
  const handleOtpSubmit = async (email, otp) => {
        console.log(email, otp);
    
        const success = await verifyResetOtp(email, otp)
        if (success) {
            toast.success("OTP Verified")
            setStep('password')
        }
  }

  // 3. Reset Password
  const handleResetSubmit = async (e) => { 
        e.preventDefault()
        if(newPassword !== confirmPassword) return toast.error("Passwords does not match")
            
        await resetPassword(email, newPassword)         
        return
  }

  return (
    <div 
      className='min-h-screen flex items-center justify-center bg-gray-50 px-4 bg-center bg-cover pt-24 lg:pt-0 pb-16' 
    >

       
       {/* Card */}
       <div className='relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl border-t-4 border-red-500 p-8'>
           
           <button onClick={() => step === 'email' ? navigate('/login') : setStep('email')} className='mb-4 text-gray-500 hover:text-gray-800'>
               <FaArrowLeft size={18} />
           </button>

           <h2 className='text-2xl font-bold text-center text-gray-800 mb-2 font-Zalando'>
               {step === 'email' ? 'Forgot Password' : step === 'otp' ? 'Verify Code' : 'Reset Password'}
           </h2>

           {/* STEP 1: EMAIL */}
           {step === 'email' && (
               <form onSubmit={handleEmailSubmit} className='flex flex-col gap-4 mt-6'>
                   <div className='relative'>
                       <IoIosMail className='absolute left-3 top-3.5 text-gray-400' size={22}/>
                       <input type="email" placeholder="Enter email address" value={email} onChange={e=>setEmail(e.target.value)} className='w-full pl-10 p-3 border rounded-lg focus:border-red-500 outline-none' required/>
                   </div>
                   <button 
                        disabled={globalLoading}
                        className={`${globalLoading ? 'bg-gray-500' : 'bg-red-500'} flex items-center justify-center text-white font-bold py-3 rounded-lg hover:bg-red-600 transition`}
                   >
                        {globalLoading ? <Spinner/> : 'Send OTP' }
                        
                   </button>
               </form>
           )}

           {/* STEP 2: OTP COMPONENT */}
           {step === 'otp' && (
               <div className='mt-6'>
                   <VerifyOtp 
                    title="" 
                    email={email} 
                    purpose="Verify & Continue" 
                    onSubmit={handleOtpSubmit} 
                   />
               </div>
           )}

           {/* STEP 3: NEW PASSWORD */}
           {step === 'password' && (
               <form onSubmit={handleResetSubmit} className='flex flex-col gap-4 mt-6'>
                   <div className='relative'>
                       <FaUnlockAlt className='absolute left-3 top-3.5 text-gray-400'/>
                       <input type={showPass ? "text" : "password"} placeholder="New Password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className='w-full pl-10 p-3 border rounded-lg focus:border-red-500 outline-none' required/>
                       <button type="button" onClick={()=>setShowPass(!showPass)} className='absolute right-3 top-3.5 text-gray-400'>{showPass ? <IoIosEyeOff/> : <IoIosEye/>}</button>
                   </div>
                   <div className='relative'>
                       <FaUnlockAlt className='absolute left-3 top-3.5 text-gray-400'/>
                       <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className='w-full pl-10 p-3 border rounded-lg focus:border-red-500 outline-none' required/>
                   </div>
                   <button 
                    disabled={globalLoading}
                    className={`${globalLoading ? 'bg-gray-500' : 'bg-red-500'} flex items-center justify-center text-white font-bold py-3 rounded-lg hover:bg-red-600 transition`}>
                        {globalLoading ? <Spinner/> : 'Reset Password' } 
                    </button>
               </form>
           )}

       </div>
    </div>
  )
}

export default ForgotPassword