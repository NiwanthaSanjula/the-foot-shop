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

connectDB();
connectCloudinary()

const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL 
];

// Uses express.raw() to preserve the digital signature
app.post('/api/order/webhook', express.raw({ type: 'application/json' }), stripeWebhook)

app.use(express.json())
app.use(cookieParser())
app.use(cors({ 
    origin: ['http://localhost:5173', 'https://your-frontend.vercel.app'], 
    credentials: true 
})); //we can send cookies in the response, in the express app

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