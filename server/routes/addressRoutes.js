import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { addAddress, deleteAddress, getUserAddresses, updateAddress } from '../controllers/addressController.js'

const addressRouter = express.Router()

addressRouter.post('/add-address',protect,addAddress)
addressRouter.get('/get-addresses',protect, getUserAddresses)
addressRouter.post('/update-address',protect,updateAddress)
addressRouter.post('/delete-address',protect,deleteAddress)

export default addressRouter


