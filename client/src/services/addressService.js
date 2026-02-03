import API from './api'

export const addressService = {
    addAddress : async (data) => {
        try {
            const response = await API.post('/address/add-address', data);
            return response.data

        } catch (error) {
            throw new Error(error.response?.data?.message || error.message);
        }
    },

    getAddresses : async () => {
        try {
            const response = await API.get('/address/get-addresses')
            return response.data

        } catch (error) {
            throw new Error(error.response?.data?.message || error.message);            
        }
    },

    updateAddress : async (data) => {
        try {
            const response = await API.post('/address/update-address', data);
            return response.data

        } catch (error) {
            throw new Error(error.response?.data?.message || error.message);            
        }
    },
    deleteAddress : async (id) => {
        try {            
            const response = await API.post('/address/delete-address', { id })
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message);            
        }
    }
}