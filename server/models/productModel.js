import mongoose from "mongoose";

const productShema = new mongoose.Schema({
    name : { type : String, required : true },
    name : { type : String, required : true, unique : true },
    sku : { type : String, required : true },
    description : { type : String, required : true },
    price : { type : Number, required : true },
    discountPrice : { type : String, default : 0 },

    gender : { type : String, required: true, enum : ['Men', 'Women', 'Unisex'] },
    category : { type : String, required : true },
    subCategory : { type : String, required : true },
    brand : { type : String, required : true },

    images : { type : [String], required : true },

    inventory : [
        {
            size : { type : String, required : true },
            stock : { type : Number, required : true }
        }
    ],

    color : {
        name : { type : String},
        hex : { type : String }
    },
    tags : { type : [String], default : [] },

    // Calculated Fields (Auto-set to 0 for new products)
    rating : { type : Number , default: 0 },
    reviewCount : { type : Number, default : 0 },
    salesCount : { type : Number, default : 0 },
    isNewArrival : {type : Boolean, default : true },

    specs : {
        material : { type : String },
        sole : { type : String },
        closure : { type : String },
        weight : { type  : String }
    },

    isActive : { type : Boolean, default : true },
    cost : { type : Number, required : true },
    lowStockThreshold : { type : Number, default : 5 }


}, { minimize : false, timestamps : true })

const Product = mongoose.models.product || mongoose.model('product', productShema)

export default Product;