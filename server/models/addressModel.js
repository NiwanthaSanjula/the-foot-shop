import mongoose from "mongoose";

const addressShema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    fullName : { type : String, required : true },
    phoneNumber : { type : String , required : true },
    street : { type : String, required : true },
    city : { type : String, required : true },
    district : { type : String, required : true },
    postalCode : { type : String, required : true },
    isDefault : { type : String, default : false }
}, { timestamps : true })

const Address = mongoose.models.address || mongoose.model('address', addressShema);
export default Address;