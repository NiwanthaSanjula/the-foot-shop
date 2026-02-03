import API from "./api";

export const adminService = {

    // ============= Get All Users =============
    getAllUsers : async () => {
        try {
            const response = await API.get('/admin/users')
            return response.data

        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to load users!')
        }
    },
}