import axios from "axios";

const API_URL = 'http://localhost:8081/api/orders';

export const fetchAllOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axios.patch(
            `${API_URL}/status/${orderId}?status=${status}`
        );
        return response.status === 200;
    } catch (error) {
        console.error('Error updating order status:', error);
        return false;
    }
};