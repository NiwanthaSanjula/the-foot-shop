import API from "./api";

export const cartServices = {
    // Get cart from DB (logged users only)
    getCart: async () => {
        const response = await API.get('/cart/get');
        return response.data;
    },

    // Add item to cart (logged users only)
    addToCart: async (item) => {
        const response = await API.post('/cart/add', item);
        return response.data;
    },

    // Update cart item quantity or remove (logged users only)
    updateCart: async (data) => {
        const response = await API.post('/cart/update', data);
        return response.data;
    }
}