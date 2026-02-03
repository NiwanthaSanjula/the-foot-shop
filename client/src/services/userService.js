import API from "./api";

export const userServices = {

    getAllUsers : async (filters = {}) => {
        try {
            const queryString = new URLSearchParams(filters).toString()

            const response = await API.get(`/user/all-users?${queryString}`)
            return response.data

        } catch (error) {
            throw new Error(error.response?.data?.message || error.message)
        }
    },

    deleteUser : async (id) => {
        try {
            const response = await API.post('user/delete/user', { id });
            return response.data
            
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message)            
        }
    }

}