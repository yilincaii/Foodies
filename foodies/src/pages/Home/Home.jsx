import React from 'react';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import { useState } from 'react';

const Home = () => {
  const [category, setCategory] = useState('All');
  return (
    <main className='container'>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} searchText={''}/>
    </main>
  )
}

export default Home;