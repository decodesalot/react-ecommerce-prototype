import axiosInstance from "../config/axios";
export const api = async (endpoint, config = {}) => {
    try {
        const response = await axiosInstance.request({
            url: endpoint,
            ...config,
        });
        return response.data;
    } catch (error) {
        console.error(`Error making API request to ${endpoint}:`, error);
        throw error;
    }
};