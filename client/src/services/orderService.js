import API from "./api";

export const orderService = {
    
    // Place Order (Guest or User)
    placeOrder: async (orderData) => {
        const response = await API.post('/order/place', orderData);
        return response.data;
    },

    // Get Logged In User Orders
    getUserOrders: async () => {
        const response = await API.post('/order/userorders');
        return response.data;
    },

    // Admin: Get All Orders
    getAllOrders: async () => {
        const response = await API.get('/order/list');
        return response.data;
    },

    // Admin: Update Status
    updateStatus: async (orderId, status) => {
        const response = await API.post('/order/status', { orderId, status });
        return response.data;
    }
}