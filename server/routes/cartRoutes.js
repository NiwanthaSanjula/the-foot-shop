import express from 'express'
import { addToCart, getUserCart, updateCartItem } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.get('/get', protect, getUserCart);
cartRouter.post('/add', protect, addToCart);
cartRouter.post('/update', protect, updateCartItem);

export default cartRouter