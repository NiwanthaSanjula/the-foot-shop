import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js";

// === GET USER CART ===
export const getUserCart = async (req, res) => {
    try {
        const userId = req.user._id
        const cart = await Cart.findOne({ userId })
        res.json({ success: true, cart: cart ? cart.items : [] });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};

// === ADD TO CART ===
export const addToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, size, quantity } = req.body;

        // Fetch the fresh product data
        const product = await Product.findById(productId)
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        // Check Stock Availability
        const variant = product.inventory.find(inv => inv.size === size)
        if (!variant) return res.status(400).json({ success: false, message: "Invalid Size" });   
        
        // Find or Create Cart        
        let cart = await Cart.findOne({ userId });
        if (!cart) cart = new Cart({ userId, items: [] })
        
        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId && p.size === size)

        if (itemIndex > -1) {
            // Item exists: Check if adding new quantity exceeds stock
            const newQty = cart.items[itemIndex].quantity + quantity;
            if (newQty > variant.stock) {
                return res.status(400).json({ success: false, message: `Stock limit reached. Only ${variant.stock} available.` });
            }
            cart.items[itemIndex].quantity = newQty;

        } else {
            // New Item: Check initial quantity against stock
            if (quantity > variant.stock) {
                return res.status(400).json({ success: false, message: "Out of Stock" });
            }

            // Add new item with FRESH details from DB
            cart.items.push({
                productId,
                name: product.name,
                price: product.price,
                discountPrice: product.discountPrice || null,
                image: product.images[0],
                size,
                quantity
            });
        }

        await cart.save();
        res.json({ success: true, cart: cart.items })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// === UPDATE CART QUANTITY ===
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, size, quantity } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found!' })
        }

        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId && p.size === size)

        if (itemIndex > -1) {
            if (quantity > 0) {
                // Fetch product to verify stock before updating
                const product = await Product.findById(productId);
                if(product) {
                    const variant = product.inventory.find(inv => inv.size === size);
                    if (variant && quantity > variant.stock) {
                        return res.status(400).json({ success: false, message: `Max stock is ${variant.stock}` });
                    }
                }
                
                cart.items[itemIndex].quantity = quantity;
            } else {
                // Remove item if quantity is 0
                cart.items.splice(itemIndex, 1);
            }
            await cart.save();
            res.json({ success: true, cart: cart.items });
        } else {
            res.status(404).json({ success: false, message: "Item not found" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}