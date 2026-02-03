import React, { useRef } from 'react'
import { useAppContext } from '../../context/AppContext'
import Spinner from '../common/Spinner'

const VerifyOtp = ({ title, email, onSubmit, purpose }) => {

    const { globalLoading } = useAppContext()

    const inputRefs = useRef([])

    const inputHandler = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text')
        const pasteArray = paste.split('')
        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const otpArray = inputRefs.current.map(e => e.value)
        const otp = otpArray.join('')
        onSubmit(email, otp)
    }

    // --- UI  ---
    return (
        <form onSubmit={onSubmitHandler} className='w-full flex flex-col gap-6'>
            
            {/**Title hidded, bcd parent handle it */}
            {title && <h2 className='text-center text-xl font-bold text-gray-800 hidden'>{title}</h2>}
            
            <div className='text-center'>
                <p className='text-gray-500 text-sm'>Enter the 6-digit code sent to</p>
                <p className='font-bold text-gray-800 mt-1'>{email}</p>
            </div>

            <div className='flex justify-center gap-2 sm:gap-3' onPaste={handlePaste}> 
                {Array(6).fill(0).map((_, index) => (
                    <input 
                        key={index}
                        type="text"
                        maxLength='1'
                        required
                        ref={e => inputRefs.current[index] = e}
                        onInput={(e) => inputHandler(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className='w-10 h-12 sm:w-12 sm:h-14 border border-gray-300 rounded-lg text-center text-xl font-bold focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all'
                    />
                ))}
            </div>

            <button
                disabled={globalLoading}
                className={`w-full ${globalLoading ? 'bg-gray-400' : 'bg-red-500'}  flex items-center justify-center text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-all shadow-md active:scale-95`}
            >

                {globalLoading ? <Spinner/> : purpose || "Verify"}
            </button>
        </form>
    )
}

export default VerifyOtp