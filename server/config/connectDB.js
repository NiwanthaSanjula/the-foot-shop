import mongoose from "mongoose";

const connectDB = async () => {
 
    try {
        mongoose.connection.on('connected' , () => {
            console.log('Database Connected✅');            
        })

        await mongoose.connect(
            `${process.env.MONGODB_URI}/the-foot-shop`
        )
    } catch (error) {
        console.log('Database Connection failed : ' + error.message);
        
    }
}

export default connectDB