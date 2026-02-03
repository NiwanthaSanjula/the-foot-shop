import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protect = async( req , res, next ) => {
    const token = req.cookies.accessToken

    console.log('USER FROM TOKEN:', !!token)


    if (!token) {
        return res.status(401).json({
            success : false,
            message : 'Not Authorized! Please login'
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        const user = await User.findById(decode.id).select('-password')

        if (!user) {
            return res.status(401).json({
                success : false,
                message : 'User not found!'
            })
        }
        req.user = user
        next()

    } catch (error) {
        return res.status(401).json({
            success : false,
            message : 'Invalid token!'
        })
    }
}
