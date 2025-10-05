
import axios from "axios";
import { createContext, useEffect, useState } from "react";export const StoreContext = createContext(null);

import { fetchFoodList } from "../../service/foodService";
import { addToCart, getCartData } from "../../service/cartService";
import { removeQtyFromCart } from "../../service/cartService";
export const StoreContextProvider = (props) => {
    const [foodList, setFoodList] = useState([]);
    const [quantities, setQuantities] = useState({ });
    const [token,setToken] = useState(localStorage.getItem("token") || "");


    const increaseQty= async (foodId) => {
        setQuantities((prev) => ({...prev,[foodId]: (prev[foodId] || 0) + 1 }));
        //call APi
        await addToCart(foodId,token);
    };

    const decreaseQty=async (foodId) => {
        setQuantities((prev) => ({...prev,[foodId]: prev[foodId] > 0 ? prev[foodId] -1 : 0,
         }));
        await removeQtyFromCart(foodId,token);
    };
    const removeFromCart = (foodId) => {
        setQuantities((prevQuantities) => {
            const updatedQuantities = { ...prevQuantities };
            delete updatedQuantities[foodId];
            return updatedQuantities;
        });

    };
    const loadCartData = async (token) => {
        const items = await getCartData(token);
        setQuantities(items);

    }

    const contextValue = {
        foodList,
        increaseQty,
        decreaseQty,
        quantities,
        removeFromCart,
        token,
        setToken,
        setQuantities,
        loadCartData
    };

useEffect(() => {
    async function loadData() {
        const data = await fetchFoodList();
        setFoodList(data);
        
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            setToken(storedToken);
            await loadCartData(storedToken); // ✅ 只在有 token 时加载
        } else {
            setQuantities({}); // ✅ 未登录时设置为空对象
        }
    }
    loadData();
}, []);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}