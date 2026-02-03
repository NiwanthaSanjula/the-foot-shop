import User from "../models/userModel.js";

// =========== GET ALL USERS ==========
export const getAllUsers = async (req, res) =>{
    try {
       const { search, page, limit } = req.query

       let query = {}

       if (search) {
            query.$or = [
                { name : { $regex: search, $options : "i" }},
                { email : { $regex: search, $options: "i" }}
            ];
       }

       const pagenumber = parseInt(page) || 1;
       const pageSize = parseInt(limit) || 10 ;
       const skip = (pagenumber - 1) * pageSize;

       const [ users, total ] = await Promise.all([
            User.find(query)
                .select('-password')
                .sort({ createdAt : -1 })
                .skip(skip)
                .limit(pageSize),
            User.countDocuments(query)
       ]);

       res.json({
            success : true,
            users,
            pagination : {
                total,
                page : pagenumber,
                pages : Math.ceil(total / pageSize)
            }
       });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success : false, message : error.message })
    }
}


// =========== DELETE USER ==========
export const deleteUser = async (req, res) =>{
    try {
        const { id } = req.body;
        await User.findByIdAndDelete(id)
        res.json({ success : true, message : "User deleted" })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success : false, message : error.message })
    }
}
