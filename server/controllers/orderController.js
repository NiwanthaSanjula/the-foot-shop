import Stripe from "stripe";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";


// Init stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ======== PLACE ORDER =========
export const placeOrder = async (req, res) => {
    try {
        // userId comes from middleware (if logged in)
        // Fro guests, req.user is undefined, so default is null
        const userId = req.user ? req.user._id : null;

        const { items, amount, address, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ success : false, message : 'Cart is empty!' })
        }

        // Stock validation
        for ( const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product ${item.name} not found` });
            }

            const variant = product.inventory.find(inv => inv.size === item.size);
            if (!variant) {
                return res.status(400).json({ success: false, message: `Size ${item.size} unavailable for ${item.name}` });
            }
    
            if (variant.stock < item.quantity) {
                return res.status(400).json({ success: false, message: `Insufficient stock for ${item.name} (${item.size})` });
            }

            // Deduct Stock
            variant.stock -= item.quantity

            // Increment Sales Count (Optional, good for analytics)
            product.salesCount = (product.salesCount || 0) + item.quantity;

            await product.save();
        }


        const orderData = {
            userId, //can be null
            items,
            amount,
            address,
            paymentMethod,
            payment: false,
            date : Date.now()
        };

        const newOrder = new Order(orderData)
        await newOrder.save();

        if (userId) {
            await User.findByIdAndUpdate(userId, {cartData : {}})
        }
        
        // Payment Handling
        if (paymentMethod === 'cod') {
            return res.json({ success: true, message: "Order Placed Successfully" });
        }
        else if (paymentMethod === 'stripe') {
            // Create Stripe Session or PaymentIntent here
            const line_items = items.map((item) => ({
                price_data: {
                    currency: 'usd', // Change to your currency (e.g., 'lkr')
                    product_data: { name: item.name },
                    unit_amount: item.price * 100 // Stripe expects cents
                },
                quantity: item.quantity
            }));

            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: { name: 'Delivery Charges' },
                    unit_amount: 500 // $5.00 Delivery
                },
                quantity: 1
            });

            const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                mode: 'payment',
                success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,

                metadata: {
                    orderId: newOrder._id.toString(),
                    userId: userId ? userId.toString() : ""
                }
            });

            return res.json({ success: true, session_url: session.url });
        }

       

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// STRIPE WEBHOOK (Handles Payment Verification)
export const stripeWebhook = async (req, res) => {
    
    // Create a new instance to ensure clean config
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("Webhook Error:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // Handle Events
    switch (event.type) {
        
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Retrieve the Session to get our Metadata
            const sessions = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            if (sessions.data.length > 0) {
                const session = sessions.data[0];
                const { orderId, userId } = session.metadata; // Reads metadata we sent in placeOrder

                console.log(`💰 Payment Succeeded for Order: ${orderId}`);

                // 1. Mark Order as Paid
                await Order.findByIdAndUpdate(orderId, { 
                    payment: true,
                    status: 'Packing' 
                });

                // 2. Clear Cart (if user exists)
                if (userId) {
                    await Cart.findOneAndDelete({ userId });
                }
            }
            break;
        }

        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const sessions = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntent.id,
            });

            if (sessions.data.length > 0) {
                const { orderId } = sessions.data[0].metadata;
                console.log(`❌ Payment Failed for Order: ${orderId}`);
                
                // Delete the temporary order since payment failed
                await Order.findByIdAndDelete(orderId);
            }
            break;
        }

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
}


// ================= ADMIN: GET ALL ORDERS =================
export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ date: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// ================= USER: GET MY ORDERS =================
export const userOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).sort({ date: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// ================= ADMIN: UPDATE STATUS =================
export const updateStatus = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: 'Status Updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}