import express from 'express'
import { getUserData, login, logout, refreshToken, register, resetPassword, sendResetOtp, verifyRegisterOtp, verifyResetOtp } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/verify-user', verifyRegisterOtp)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/send-reset-otp', sendResetOtp)
authRouter.post('/verify-reset-otp', verifyResetOtp)
authRouter.post('/reset-password', resetPassword)
authRouter.post('/refresh-token', refreshToken)
authRouter.get('/me', protect, getUserData)

export default authRouter