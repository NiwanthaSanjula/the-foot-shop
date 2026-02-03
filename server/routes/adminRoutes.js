import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { isAdmin } from '../middleware/adminMiddleware.js'

const adminRouter = express.Router()

export default adminRouter

