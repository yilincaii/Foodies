import axios from "axios";

const API_URL = 'http://localhost:8081/api/foods';

// 创建一个获取认证头的函数
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
};

export const fetchFoodList = async () => {
    try {
        // ✅ 不需要 Authorization header，因为这个接口已经在 SecurityConfig 中 permitAll
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log('Error fetching the food list', error);
        throw error;
    }
}

export const fetchFoodDetails = async(id) => {
    try {
        // ✅ 同样不需要 Authorization
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching food details', error);
        throw error;
    }
}