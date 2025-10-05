import logo from './logo.png';
import cart from './cart.png';

import coldDishes from './codeDishes.jpg';  
import vegetables from './veg.jpeg';
import meat from './meeet.jpg';
import soupDrinks from './soup.jpeg';
import stapleFood from './rolls.png';
import seafood from './Seafood.avif';

import profile from './profile.png';
import delivery from './delilogo.png';

export const assets = {
    logo,
    cart,
    profile,
    delivery
}

export const categories = [
    {
        category: 'Cold Dishes',
        icon: coldDishes
    },
    {
        category: 'Vegetables',
        icon: vegetables
    },      
    {
        category: 'Meat',
        icon: meat
    },
    {
        category: 'Soup & Drinks',
        icon: soupDrinks
    },
    {
        category: 'Staple Food',
        icon: stapleFood
    },
    {
        category: 'Seafood',
        icon: seafood
    }
];