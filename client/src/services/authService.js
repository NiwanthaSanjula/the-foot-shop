import API from './api'


export const authService = {

    //========== CHECK IF USER LOGGED IN VIA COOKIE ===============
    getUser : async () => {
        try {
            const response = await API.get('/auth/me')
            return response.data;

        } catch (error) {
            throw new Error(error)
        }
    },


    // ========= LOGIN =============
    login : async (email, password) => {
        try {            
            const response = await API.post('/auth/login',{ email, password })
            return response.data

        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed')
        }
    },

    // ========= REGISTER ===========
    register : async (name, email, password) => {
        try {
            const response = await API.post('/auth/register', { name, email, password })
            return response.data
            
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Registration Error!')
            
        }
    },

    // ========= Verify OTP ===========
    // Tweak verifyOTP to be more realistic for "register -> verify" flow
    verifyOTP : async (email, otp) => {
        try {
            const response = await API.post('/auth/verify-user', {email, otp})
            return response.data

        } catch (error) {
            throw new Error(error.response?.data?.message || 'Registration Error!')            
        }
    },

    // ========= RESET REQUEST ===========
    resetPasswordRequest : async( email ) => {
       try {
            const response = await API.post('/auth/send-reset-otp', { email })
            return response.data

       } catch (error) {
            throw new Error(error.response?.data?.message || 'OTP send failed')
       }
    },

    // ========= Verify REST OTP ===========
    validateResetOtp : async(email, otp) => {
        try {
            const response = await API.post('/auth/verify-reset-otp', {email, otp})
            return response.data

        } catch (error) {
            throw new Error(error.response?.data?.message || 'OTP verify failed')  
        }
    },

    // ========= RESET PASSWORD ==============
    resetPassword: async (email, newPassword, resetToken) => {
       try {
            const response = await API.post('/auth/reset-password', {email, newPassword, resetToken})
            return response.data

       } catch (error) {
            throw new Error(error.response?.data?.message || 'Password reset failed!')
       }
    },

     // ========= LOGOUT ==============
    logout : async () => {
        try {
            const response = await API.post('/auth/logout')
            return response.data

        } catch (error) {
            throw new Error(error.response?.data?.message || 'Logout failed!')
        }
    }

};


