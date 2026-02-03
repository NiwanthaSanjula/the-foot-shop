import { v2 as cloudinary } from 'cloudinary'

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name : process.env.CLOUDE_NAME,
        api_key : process.env.CLOUDINARY_API,
        api_secret : process.env.CLOUDINARY_SECRET,
    })
    console.log('Cloudinary Connected');
}
export default connectCloudinary