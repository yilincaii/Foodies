import React from 'react';
import { useParams } from 'react-router-dom';

const FoodDetails = () => {
    const {id}= useParams();
  return (
    <div>FoodDetails</div>
  )
}

export default FoodDetails;