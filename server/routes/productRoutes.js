import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { addProduct, deleteProduct, getAllProducts, getProductFilters, getShopProducts, getSingleProduct, toggleProductStatus } from '../controllers/productController.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import upload from '../middleware/multer.js';


const productRouter = express.Router();

productRouter.post('/add-product', protect, isAdmin,upload.array('images', 4), addProduct)
productRouter.get('/all-products', protect, isAdmin, getAllProducts)
productRouter.post('/toggle-availability', protect, isAdmin, toggleProductStatus)
productRouter.post('/delete-product', protect, isAdmin, deleteProduct)
productRouter.get('/filters', getProductFilters)
productRouter.get('/shop-list', getShopProducts)
productRouter.get('/:id', getSingleProduct)


export default productRouter