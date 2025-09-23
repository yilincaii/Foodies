import axios from "axios";
import React, {useEffect, useState } from "react";
import { toast } from "react-toastify";
import './ListFood.css';


const ListFood = () => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get("http://localhost:8081/api/foods");
    console.log(response.data);
    if(response.status === 200) {
      setList(response.data);
    }else{
      toast.error("Error while reading the foods.");
    }
  }


  const removeFood = async (foodId) => {
    const response = await axios.delete(`http://localhost:8081/api/foods/${foodId}`);
    await fetchList();
    if(response.status === 204) {
      toast.success(" food removed.");
    }else{
      toast.error("Error occred while removing the food.");
    }
  }

  useEffect(() => {
    fetchList();
  }, []);
  
 return (
    <div className="py-5 row justify-content-center">
      <div className="col-11 card">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={item.imageUrl} alt="" height={48} width={48} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>&#36;{item.price}.00</td>
                  <td className="text-danger">
                    <i
                      className="bi bi-x-circle-fill" onClick={() => removeFood(item.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListFood;