import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/cart-mamagement/Cart';
import Home from './components/home/ShophomePage';
//import ClothesViewer from './components/home/itemPage';
import ItemDetails from './components/home/itemDetails';
import ClothesReturn from './components/home/returnHomePage';
import CartDashboard from './components/cart-mamagement/CartDashBoard';


function App() {
  return (
    <BrowserRouter>

        <Routes>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/home" element={<Home/>}/>
          {/* <Route path="/item" element={<ClothesViewer/>}/> */}
          <Route path="/item/:item_code" element={<ItemDetails/>}/>
          <Route path="/" element={<ClothesReturn />} />
          <Route path="/cart-dashboard" element={<CartDashboard/>} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
