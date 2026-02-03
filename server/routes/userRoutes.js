import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { isAdmin } from '../middleware/adminMiddleware.js'
import { deleteUser, getAllUsers } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/all-users', protect, isAdmin, getAllUsers)
userRouter.post('/delete-user', protect, isAdmin, deleteUser)

export default userRouter
