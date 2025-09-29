
import axios from "axios";
import { createContext, useEffect, useState } from "react";export const StoreContext = createContext(null);

import { fetchFoodList } from "../../service/foodService";
export const StoreContextProvider = (props) => {
    const [foodList, setFoodList] = useState([]);
    const [quantities, setQuantities] = useState({ });
    const [token,setToken] = useState(localStorage.getItem("token") || "");


    const increaseQty=(foodId) => {

        setQuantities((prev) => ({...prev,[foodId]: (prev[foodId] || 0) + 1 }));
    }
    const decreaseQty=(foodId) => {
        setQuantities((prev) => ({...prev,[foodId]: prev[foodId] > 0 ? prev[foodId] -1 : 0 }));
    };
    const removeFromCart = (foodId) => {
        setQuantities((prevQuantities) => {
            const updatedQuantities = { ...prevQuantities };
            delete updatedQuantities[foodId];
            return updatedQuantities;
        });

    };

    const contextValue = {
        foodList,
        increaseQty,
        decreaseQty,
        quantities,
        removeFromCart,
        token,
        setToken
    };

    useEffect(() => {
        async function loadData() {
            const data = await fetchFoodList();
            setFoodList(data);
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
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