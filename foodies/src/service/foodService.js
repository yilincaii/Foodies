import axios from "axios";

const API_URL = 'http://localhost:8081/api/foods';


export const fetchFoodList = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log('Error', error);
        throw error;
        
    }
    
}