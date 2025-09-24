
import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);

import { fetchFoodList } from "../../service/foodService";
export const StoreContextProvider = (props) => {
    const [foodList, setFoodList] = useState([]);


    const contextValue = {
        foodList
    };

    useEffect(() => {
        async function loadData() {
            const data = await fetchFoodList();
            setFoodList(data);
        }
        loadData();
    }, []);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}