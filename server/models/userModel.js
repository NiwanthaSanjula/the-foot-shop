import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : { type : String, required : true },
    email : { type : String, required : true, unique : true },
    password : { type : String, required : true },
    role : {
        type : String,
        enum :['user', 'admin'],
        default : 'user'
    },
    isVerified : { type : Boolean, default : false},
    verifyOtp :{ type : String, default : ''},
    verifyOtpExpireAt : { type : Number, default : 0 },
    resetOtp : { type : String, default : ''},
    resetOtpExpireAt : { type : Number, default : 0 },
}, { timestamps : true });

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;