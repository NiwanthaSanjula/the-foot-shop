import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import transporter from '../config/nodemailer.js'


//HELPER : Generate OTP
const generateOtp = () => String(Math.floor(100000 + Math.random() * 90000))

// HELPER : Generate access token
const generateAccessToken = (user) => {
    return jwt.sign (
        {id : user._id, role : user.role},
        process.env.JWT_ACCESS_SECRET,
        { expiresIn : '15m'}
    )
}

// HELPER : Generate refresh token
const generateRefreshToken = (user) => {
    return jwt.sign (
        {id : user._id, role : user.role},
        process.env.JWT_REFRESH_SECRET,
        { expiresIn : '7d'}
    )
}

// HELPER : Send OTP Email
const sendOtpEmail = async ( email, otp, type = 'verify') => {
    const subject = {
        verify : 'Email Verification OTP',
        reset : 'Password Reset OTP'
    }
    const message = {
        verify : 'Email Verification',
        reset : 'Password Reset'
    }

    const mailOptions = {
        from : process.env.SENDER_EMAIL,
        to : email,
        subject : subject[type],
        html : `
            <h3>${message[type]}</h3>
            <p>Your OTP is:</p>
            <h2>${otp}</h2>
            <p>This OTP will expire in ${type === 'reset' ? '15' : '10'} minutes.</p>
        `
    }
    try {
        await transporter.sendMail(mailOptions)
        return true

    } catch (error) {
        throw new Error(error)
        
    }
}

// HELPER : Set Token Cookie
const setAuthCookies = (res, accessToken, refreshToken ) => {
    res.cookie('accessToken', accessToken, {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge : 15 * 60 * 1000
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge : 7 * 24 * 60 * 60 * 1000
    })

}

//HELPER : Get user
const getUser = ( user ) => ({
    _id : user._id,
    name : user.name,
    email : user.email,
    role : user.role,
    isVerified : user.isVerified,
    createdAt : user.createdAt.toLocaleDateString('en-US', {
        year : 'numeric',
        month : 'long',
        day : 'numeric'
    })
})


// =========== REGISTER ==============
export const register = async (req, res) => {
    const { name, email , password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success : false, message : 'Missing Details!'});
    }
    
    

    try {
        const existingUser = await User.findOne({ email });

        console.log("Before user exist");
        if (existingUser) {
            return res.json({ success : false, message : 'User already exists!' })
        }
        console.log("After user exist");


        const hashedPassword = await bcrypt.hash(password, 10);

        //GENERATE OTP
        const otp = generateOtp()

        const user = new User({
            name, 
            email, 
            password : hashedPassword,
            verifyOtp : otp,
            verifyOtpExpireAt : Date.now() + 10 * 60 * 1000,
        })
        await user.save();

        //Send Otp
        const emailSent = await sendOtpEmail(email, otp, 'verify')    

        if (!emailSent) {
            await User.deleteOne({email})
            return res.status(500).json({
                success : false,
                message : "Failed to send OTP email!"
            })
        }

        return res.json({
            success : true,
            message : `OTP sent to ${email}`
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message : 'Error During Register!'})
    }
}

// ========== VERIFY REGISTER OTP ============
export const verifyRegisterOtp = async (req, res) => {
    const { email, otp } = req.body

    if (!email || !otp) {
        return res.json({ success : false, message : 'Email and OTP are required!'});
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.json({ success : false, message : 'We cant find your email!'});
        }
        if (user.isVerified) {
            return res.json({ success : false, message : 'Email already verified!'});            
        }
        if (user.verifyOtp !== otp) {
            return res.json({ success : false, message : 'Invalid OTP!'});            
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success : false, message : 'OTP Expired!'});            
        }

        // Update user
        user.isVerified = true,
        user.verifyOtp = '',
        user.verifyOtpExpireAt = 0,
        await user.save()

        //Create token
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        //Set token in cookie
        setAuthCookies(res, accessToken, refreshToken)

        //Send Welcome mail
        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to : email,
            subject : 'Welcome to THE FOOT SHOP!',
            html : `
                <p>DEAR ${user.name}!</p> 
                <p>Your account has been succesfully created with ${email}</p>
            `
        }
        try {
            await transporter.sendMail(mailOptions)

        } catch (error) {
            console.log("Error send email! : ", error);     
        }
        return res.json({ success : true, message : " User registered!", user : getUser(user)})

    } catch (error) {
        console.log(error);
        return res.json({ success : false, message : 'Error verify user!'})   
    }

}

// ========== USER LOGIN ==============
export const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ success : false, message : 'Missing credentials!' })
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.json({ success : false, message : 'Invalid email or password!' })            
        }

        if (!user.isVerified) {
            return res.json({ success : false, message : 'Please verify you email!' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success : false, message : 'Invalid email or password!' })            
        }

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        setAuthCookies(res, accessToken, refreshToken)

        console.log(user);
        

        return res.json ({
            success : true,
            message : "Login successfull!",
            user : getUser(user)
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success : false, message : 'Login failed!' })
    }
}

//=========== GET USER DATA ============
export const getUserData = async (req, res) => {
    try {
        //req.user is already attached by 'protect' middleware
        const user = req.user;

        res.json({ 
            success : true,
            user : {
                _id : user._id,
                name :user.name,
                email : user.email,
                role : user.role,
                isVerified : user.isVerified
            }
        });

    } catch (error) {
        res.status(500).json({ success : flase, message : 'Server Error!' })        
    }
}

// ========== REFRESH TOKEN ==============
export const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken

    if (!token) {
        return res.status(401).json({ message: 'No refresh token' })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        const user = await User.findById(decode.id)

        if (!user) {
            return res.status(401).json({ message: 'User not found!' })
        }
        const newAccessToken = generateAccessToken(user)

        res.cookie('accessToken', newAccessToken, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 15 * 60 * 1000
        })
        res.json({ success : true })

    } catch (error) {
        res.status(403).json({message : 'Invalid refresh token!'})
    }
}
// ========= LOGOUT USER ==============
export const logout = (req, res) => {
    res.clearCookie('accessToken',{
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    })
    res.clearCookie('refreshToken',{
        
    })
    res.json({ success: true })
}

// ========= SEND RESET OTP ============
export const sendResetOtp = async ( req, res ) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success : false , message : 'Email is required!'})
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json( {success : false, message : 'Email not found!'})
        }

        const otp = generateOtp()

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

        await user.save();

        await sendOtpEmail(email, otp, 'reset')

        return res.json({ success : true, message : `Reset otp sent to ${user.email}` })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success : false, message : 'Failed to send password OTP!' })
    }
}

// ========= VERIFY RESET OTP ==========
export const verifyResetOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.json({ success : false, message : "Email and OTP are required!" })
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.json({ success : false, message : 'User not found!'})
        }
        if (user.resetOtp !== otp) {
            return res.json({ success : false, message : 'Invalid OTP!'})
        }
        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success : false, message : 'OTP Expired!'})        
        }

        // Generate a short-lived token specifically for resetting password
        const resetToken = jwt.sign (
            { id : user._id, email : user.email },
            process.env.JWT_RESET_SECRET,
            { expiresIn : '5m' } //Only valid for 5 min
        )

        // clear the OTP immediately so it can't be reused
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save()

        return res.json({ success : true, message: "OTP Verified", resetToken })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success : false, message : 'Failed reset password!' })
    }
}

//====== RESET USER PASSWORD ==========
export const resetPassword = async ( req, res ) => {

    console.log('reset pw hits');
    console.log("req body : " , req.body);
    console.log('Headers:', req.headers); 
    
    
    const { email, newPassword, resetToken } = req.body

    if (!email || !newPassword || !resetToken ) {
        return res.json({ success : false, message : 'Email, password, and token are required' })
    }

    console.log(newPassword);

    try {

        const decoded = jwt.verify(resetToken, process.env.JWT_RESET_SECRET);

        if (decoded.email !== email) {
            return res.json({ success : false, message : 'Email verification failed!' })
        }
        console.log('Email decoded' + decoded.email);
        

        const user = await User.findOne({ email })

        if ( !user ) {
            return res.json({ success : false, message : 'User not found!' })
        }
        console.log('User Found');
        
        
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        console.log('Password hashed' + hashedPassword);
        
        user.password = hashedPassword

        console.log('new hashedpw from user' , user.password);
        
        await user.save();

        console.log('user saved');
        

        return res.json({ success : true, message :'Password reset successfully!' })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success : false, message : 'Failed reset password!' })
    }
}



