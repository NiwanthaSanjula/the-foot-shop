import { v2 as cloudinary } from 'cloudinary'
import Product from "../models/productModel.js"

// ========== ADD PRODUCT =============
export const addProduct = async (req, res) => {
    try {

        // ====== DEBUG LOGS ==========
        //console.log('CONTENT TYPE :', req.headers['content-type']);
        //console.log('BODY :', req.body);
        //console.log('CONTENT FILES :', req.files);
        //=============================

        const {
            name, slug, sku, brand, description, price, discountPrice,
            gender, category, subCategory, tags,isActive,lowStockThreshold, cost
        }= req.body

        const color = JSON.parse(req.body.color);
        const specs = JSON.parse(req.body.specs);
        const inventory = JSON.parse(req.body.inventory);

        // Multer puts the files here. (If empty, handle error)
        const imageFiles = req.files;
        if (!imageFiles || imageFiles.length === 0) {
            return res.status(400).json({ success : false, message : 'No Images Uploaded!'})
        }

        //upload images to cloudinary
        const imageUrl = await Promise.all(
            imageFiles.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { resource_type : 'image'});
                return result.secure_url
            })
        )

        //Save to db
        const productData = {
            name, slug, sku, brand, description,
            price: Number(price),
            discountPrice: Number(discountPrice),
            cost: Number(cost),
            gender, category, subCategory,
            tags : tags ? tags.split(',') : [],
            isActive : isActive === 'true',
            lowStockThreshold : Number(lowStockThreshold),
            color, specs, inventory,
            images : imageUrl
        }

        const product = new Product(productData);
        await product.save()

        res.json({ success : true, message : 'Product Added Successfully!' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success : false, message : error.message })
        
    }

}

// ========== GET ALL PRODUCTS TO ADMIN ============
export const getAllProducts = async ( req, res ) =>{
    try {
        
        const { search, category, gender, page, limit } = req.query;

        let query = {};

        if (category === 'Archived') {
            query.category = 'Archived'
        } else {
            query.category = { $ne : 'Archived' } //$ne means "Not Equal"
        }

        // APPLY FILTERS
        if (search) {
            query.$or = [
                { name : { $regex : search, $options : "i"} }, // Case insensitive
                { brand : { $regex : search , $options : "i"} },
                { sku : { $regex : search, $options : "i"}} //Search by SKU is super useful for Admins
            ]
        }

        // Category Filter (Ignore 'All' and 'Archived' since handled above)
        if (category && category !== 'All' && category !== 'Archived') {
            query.category = category;
            
        }
        if (gender && gender !== 'All') { 
            query.gender = gender;
        }

        // Pagination calculate
        const pageNumber = parseInt(page) || 1; //default to page 1
        const pageSize = parseInt(limit) || 10;
        const skip = ( pageNumber - 1 ) * pageSize

        //Fetch Data in Parallel (Faster)
        const  [ products, total ] = await Promise.all([
            Product.find(query)
                .sort({ createdAt : -1 })
                .skip(skip)
                .limit(pageSize),
            Product.countDocuments(query)
        ])

    
        res.json({
            success: true,
            products,
            pagination: {
                total,
                page : pageNumber,
                pages : Math.ceil(total /pageSize)
            }
        });        

    } catch (error) {
        console.log(error);
        res.status(500).json({ success : false, messgae : error.message })
    }
}

// ========== TOGGLE PRODUCT AVAILABILITY (ADMIN) ============
export const toggleProductStatus = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({ success : false, message : "Product not found!" })
        }

        product.isActive= !product.isActive;
        await product.save();

        res.json({ success : true, message :`Product is now ${product.isActive ? 'Active' : 'Hidden'}` })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success : false, message : 'Server error! Can not switch status' })
    }

}

// ========== SOFT DELETE PRODUCT (ADMIN) ============
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;

        const product = await Product.findByIdAndUpdate(id, {
            category: 'Archived', // Move to trash category
            isActive: false       // Hide from storefront
        });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" })
        }

        res.json({ success : true, message : "Product Deleted!" })

    } catch (error) {
        console.log(error);
        res.json(500).json({ success : false, message : 'Error Deleting Product!' })
    }
}

// ============ GET DYNAMIC FILTERS ============
export const getProductFilters = async (req, res) => {
    try {

        const filters = await Product.aggregate([
            {
                $match : {
                    isActive :true,
                    category :{ $ne : 'Archived'}
                }
            },

            // Use $facet to run multiple aggregations in parallel
            {
                $facet : {
                    // Get unique Categories
                    categories : [
                        { $group: {_id: '$category'} },
                        { $sort : {_id: 1}}
                    ],

                    // Get unique sub categories
                    subCategories : [
                        { $group: {_id: '$subCategory'} },
                        { $sort : {_id: 1}}
                    ],

                    // Get unique brands
                    brands :[
                        { $group : { _id: '$brand'} },
                        { $sort : {_id: 1}}                        
                    ],

                    // Get genders
                    genders : [
                        { $group : {_id : '$gender'} }
                    ],

                    colors : [
                        { $group : {
                            _id : '$color.name',
                            hex : {$first : '$color.hex'}
                        } },
                        { $sort : { _id : 1} }
                    ]
                }
            }

        ]);

        // The result is an array with one object : [{ categories : [], brands : [],...}]
        const result  = filters[0]

        // Format data
        const formatedFilters = {
            category : result.categories.map(i => i._id).filter(Boolean),
            subCategory : result.subCategories.map(i => i._id).filter(Boolean),
            brand : result.brands.map(i => i._id).filter(Boolean),
            gender : result.genders.map(i => i._id).filter(Boolean),
            color : result.colors.map(i => ({ name: i._id, hex :i.hex})).filter(item => item.name)
        }

        res.json({ success : true, filters : formatedFilters })
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// ============ GET SHOP PRODUCTS ============
export const getShopProducts = async(req, res) => {
    try {
        const { search, category, gender, brand, subCategory, color, tags, sort, page, limit } = req.query
        let query = {};

        // Basic filters
        query.category = { $ne : 'Archived'};
        query.isActive = true //Show only active products

        // Search
        if (search) {
            query.$or = [
                { name : { $regex : search, $options : 'i'} },
                { brand : { $regex : search, $options : 'i'} },
                { category : { $regex : search, $options : 'i'} },
                { subCategory : { $regex : search, $options : 'i'} },
                { description : { $regex : search , $options : 'i'}}
            ]
        }

        // Array Filters (e.g. category=Sports,Casual)
        if (category) {
            const categories = category.split(',').map(c => c.trim());
            if (categories.length > 0) query.category = { $in: categories}                    
        }

        if (gender) {
            const genders = gender.split(',').map(g => g.trim())
            if (genders.length > 0) query.gender = { $in : genders}                            
        }

        if (subCategory) {
            const subCategories = subCategory.split(',').map(sc => sc.trim())
            if (subCategories.length > 0) query.subCategory = { $in : subCategories}                             
        }

        if (brand) {
            const brands = brand.split(',').map(b => b.trim())
            if (brands.length > 0) query.brand = { $in : brand}                             
        }
        if (color) {
            const colors = color.split(',').map(c => c.trim());
            if (colors.length > 0) {
                query['color.name'] = {
                    $in: colors.map(c => new RegExp(`^${c}$`, 'i'))
                }
            }
        }
        if(tags) {
            const tagList = tags.split(',').map(t => t.trim());
            if(tagList.length > 0) {
                query.tags = { $in : tagList}
            }
        }

        // Sorting
        let sortOption = {createdAt : -1};//default: Newest
        if (sort === 'low-high') sortOption = { price: 1}
        if (sort === 'high-low') sortOption = { price: -1}
        if (sort === 'oldest') sortOption = { createdAt: 1}

        // Pagination
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 12;
        const skip = (pageNumber - 1) * pageSize;
        
        // Fetch data
        const [products, total] = await Promise.all([
            Product.find(query).sort(sortOption).skip(skip).limit(pageSize),
            Product.countDocuments(query)
        ]);

        res.json({
            success : true,
            products,
            pagination : {
                total,
                page : pageNumber,
                pages : Math.ceil(total/pageSize)
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success : false, message : 'Server Error!' })
        
    }
}

export const getSingleProduct = async(req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(400).json({success : false, message : 'Product not found!' })
        }

        // Fetch related products 
        const relatedProducts = await Product.find({
            category : product.category,
            _id : { $ne : id}, // Exclude current product
            isActive : true
        }).limit(5); //Limit to 5 items

        res.json({
            success : true,
            product,
            relatedProducts
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success : false, message : error.message })
    }
}
