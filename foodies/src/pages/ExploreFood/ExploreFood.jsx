import React, { useState } from 'react';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const ExploreFood = () => {
  const [category, setCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-group mb-3">
                <select className='form-select mt-2' style={{ 'maxWidth': '200px' }} onChange={(e) => setCategory(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Cold Dishes">Cold Dishes (凉菜)</option>
                  <option value="Vegetables">Vegetables (田园时蔬)</option>
                  <option value="Meat">Meat (肉菜)</option>
                  <option value="Soup & Drinks">Soup & Drinks (汤羹饮品)</option>
                  <option value="Staple Food">Staple Food (主食)</option>
                  <option value="Seafood">Seafood (海鲜)</option>
                </select>
                <input type="text" className='form-control mt-2' placeholder='Search your favorite dish...'
                  onChange={(e) => setSearchText(e.target.value)} value={searchText} />
                <button className='btn btn-primary mt-2' type='submit'>
                  <i className='bi bi-search'></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FoodDisplay category={category} searchText={searchText} />
    </>
  )
}

export default ExploreFood;