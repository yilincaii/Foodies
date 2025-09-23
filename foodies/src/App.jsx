import React from 'react';
import Menubar from './components/Menubar/Menubar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import ExploreFood from './pages/ExploreFood/ExploreFood';
import ContactUs from './pages/Contact Us/ContactUs';
const App = () => {
  return (
    <div>
      <Menubar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/explore' element={<ExploreFood />} />
      </Routes>
    </div>
  )
}

export default App;