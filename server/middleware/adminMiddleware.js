export const isAdmin = (req, res, next) => {

    try {
        // req.user is already populated by the 'protect' middleware
        if (req.user && req.user.role === 'admin') {
            next()
        } else {
            res.status(403).json({ success : false, message : 'Not autharized as admin!' })
        }
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Admin auth failed' });
    }

}