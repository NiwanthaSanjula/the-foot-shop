import Address from "../models/addressModel.js";

// === ADD ADDRESS ===
export const addAddress = async (req, res) => {
    try {
        const { fullName, phoneNumber, street, city, district, postalCode, isDefault } = req.body    
        const userId = req.user._id

        // If this is a frist address, force it to be default
        const addressCount = await Address.countDocuments({ userId });
        let makeDefault = isDefault;
        if (addressCount === 0) makeDefault = true
        
        // IF making this default, un-default existing addresses
        if (makeDefault) {
            await Address.updateMany({ userId }, { isDefault : false })
        }

        const address = new Address({
            userId,
            fullName,
            phoneNumber,
            street, 
            city, 
            district, 
            postalCode,
            isDefault : makeDefault
        })

        await address.save();
        res.json({ success : true, message : "Address added!", address });
                    
    } catch (error) {
        console.log(error);
        res.status(500).json({ success : false, message : 'Server error!' })
    }
}

// === GET USER ADDRESS ====
export const getUserAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ userId : req.user._id }).sort({ isDefault : -1, created : -1 });

        if (!addAddress) {
            return res.json({ success : false, message : "No addresses found!" })
        }

        res.json({ success : true, addresses })

        //Default address always appears at the top,Recently added addresses appear next

    } catch (error) {
        console.log(error);
        res.status(500).json({ success : false, message : 'Server error!' })
    }
}

// === UPDATE ADDRESS ===
export const updateAddress = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;
        const userId = req.user._id;

        //If setting as default. uncheck others
        if (updateData.isDefault) {
            await Address.updateMany({ userId }, { isDefault : false });
        }

        const updateAddress = await Address.findOneAndUpdate(
            {_id : id, userId},  //Find the address with this address ID,AND it must belong to the currently logged-in user
            updateData,
            { new : true }
        )

        if (!updateAddress) {            
            return res.status(404).json({
              success: false,
              message: "Address not found"
            });
        }
        

        res.json({ success : true, message : 'Address Updated!', address : updateAddress })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success : false, message : 'Server error!' })
    }
}

// === DELETE ADDRESS ===
export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.body
        await Address.findByIdAndDelete({ _id: id, userId : req.user._id });
        res.json({ success : true , message : 'Address Removed!' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success : false, message : 'Server error!' })
    }
}