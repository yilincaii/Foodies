import axios from "axios";

const API_URL = 'http://localhost:8081/api/cart';

export const addToCart = async (foodId, token) => {
    try {
        axios.post(API_URL, {foodId},{headers: {"Authorization": `Bearer ${token}`}}
        );        
    } catch (error) {
        console.log("Error while adding to cart", error);
    }
}

export const removeQtyFromCart = async (foodId, token) => {
try {
    axios.post(API_URL+"/remove",
             {foodId},
            {headers: {"Authorization": `Bearer ${token}`}}
        );
    
} catch (error) {
    console.log("Error while removing quantity from cart", error);
}
}

export const getCartData = async (token) => {
    try {
        const response = await axios.get(API_URL,
            {headers: {"Authorization": `Bearer ${token}`}}
        );    
        return response.data.items || {}; // ✅ 必须有默认值
    } catch (error) {
        console.log("Error fetching cart data", error);
        return {}; // ✅ 必须返回空对象
    }
}