import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import cookieParser from 'cookie-parser'
import connectDB from './config/connectDB.js';
import connectCloudinary from './config/cloudinary.js';
import authRouter from './routes/authRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import addressRouter from './routes/addressRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import { stripeWebhook } from './controllers/orderController.js';

const app = express()
const PORT = process.env.BACKEND_URL || 4000

// 1. Removed top-level await (It's risky)
connectCloudinary()

// 2. Define the allowed origins correctly
const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL 
];

// Uses express.raw() to preserve the digital signature
app.post('/api/order/webhook', express.raw({ type: 'application/json' }), stripeWebhook)

app.use(express.json())
app.use(cookieParser())

// 3. FIX: Use the 'allowedOrigins' variable you created!
app.use(cors({ 
    origin: allowedOrigins, 
    credentials: true 
}));

// 4. FIX: Global DB Check (Prevents "Buffering Timed Out" crashes)
app.use(async (req, res, next) => {
    // Skip for webhooks (speed is important)
    if (req.originalUrl.includes('/webhook')) return next();
    
    // Wait for DB to be ready before handling ANY request
    await connectDB();
    next();
});

app.get('/', (req, res) => { res.send ( 'API WORKING 🚀')})

app.use('/api/auth/',authRouter)
app.use('/api/admin/',adminRouter)
app.use('/api/product/',productRouter)
app.use('/api/user/',userRouter)
app.use('/api/address/',addressRouter)
app.use('/api/cart/',cartRouter)
app.use('/api/order/', orderRouter)

app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
})