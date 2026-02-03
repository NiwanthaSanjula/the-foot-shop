import API from "./api";

export const productServices = {

    addProduct : async (dataToSend) =>{
        try {
            const response = await API.post('/product/add-product', dataToSend, {
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
            return response.data

        } catch (error) {
            throw new Error(error.response?.data?.message || error.message)
        }
    },

    getAllProducts : async ( filters = {}) => {
        try {
            // filtersobject will look like: { page:1, limit:10, search:'nike', ... }
            const queryString = new URLSearchParams(filters).toString();

            const response = await API.get(`/product/all-products?${queryString}`)
            return response.data

        } catch (error) {
            throw new Error(error.response?.data?.message || error.message)
        }
    },

    getFilters : async () => {
        try {
            const response= await API.get('/product/filters')
            return response.data

        } catch (error) {
            throw new Error(error.response?.data?.message || error.message)
        }
    },

    toggleStatus : async (id) => {
        try {
            const response = await API.post('/product/toggle-availability', { id })
            return response.data
            
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message)
        }
    },

    deleteProduct : async (id) => {
        try {
            const response = await API.post('/product/delete-product', { id })
            return response.data
            
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message)      
        }
    },

    getShopProducts : async (filters = {}) => {
        try {
            const queryString = new URLSearchParams(filters).toString();
            const response = await API.get(`/product/shop-list?${queryString}`)
            return response.data

        } catch (error) {
            throw new Error(error.response?.data?.message || error.message)
        }
    },

    getSingleProduct : async ( id ) => {
        try {
            const response = await API.get(`/product/${id}`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message)
        }
    }
    

}

