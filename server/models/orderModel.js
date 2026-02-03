import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        default : null
    },
    items : [
        {
            productId : { type : String, required : true },
            name : { type : String, required : true },
            quantity : { type : Number , required : true },
            price : { type : Number , required : true },
            size : { type : String, required : true },
            image : { type : String, required : true}
        }
    ],
    amount : { type : Number, required : true },
    address : {
        // We store snapshot of address so it doesn't change if user updates profile
        fullName : { type : String, required : true },
        email : { type : String, required : true},
        phoneNumber : { type : String, required : true },
        street : { type : String, required : true },
        city : { type : String, required : true },
        district : { type : String, required : true },
        postalCode : { type : String, required : true },
    },
    status: { type : String, default : 'Order Placed' },
    paymentMethod : { type : String, required : true },
    payment : { type : Boolean, default : false },
    paymentIntentId : {type : String},
    date : { type : Number, default : Date.now }
})

const Order = mongoose.model('Order', orderSchema);
export default Order