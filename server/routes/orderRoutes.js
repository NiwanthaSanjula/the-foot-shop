import express from 'express'
import { placeOrder, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'
import jwt from 'jsonwebtoken'
import { isAdmin } from '../middleware/adminMiddleware.js'

const orderRouter = express.Router()

// ============================================================
// OPTIONAL AUTH MIDDLEWARE (Fixed)
// ============================================================
// This allows BOTH Guests (no token) and Users (token) to pass.
const optionalAuth = async (req, res, next) => {
    // 1. Check Cookies first (like your protect middleware), then headers
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
        req.user = null; // Guest
        return next();
    }

    try {
        // 2. Use the CORRECT secret key (Must match authController.js)
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        
        req.user = { _id: decoded.id }; // Attach User ID
        next();
    } catch (error) {
        // If token is expired or invalid, just treat them as a guest
        req.user = null; 
        next();
    }
}

// --- ROUTES ---

// 1. Place Order (Uses Fixed Optional Auth)
orderRouter.post('/place', optionalAuth, placeOrder)

// 2. User History (Uses your existing Protect middleware)
orderRouter.post('/userorders', protect, userOrders)

// 3. Admin Panel
orderRouter.get('/list',protect, isAdmin, allOrders)
orderRouter.post('/status',protect, isAdmin, updateStatus)

export default orderRouter