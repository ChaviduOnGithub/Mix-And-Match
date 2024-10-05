import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Clothes from './components/inventory-management/clothes';
import Home from './components/home/homePage'

function App() {
  return (
    <BrowserRouter>

      {/* toast message */}
      {/*<Toaster position="top-center" reverseOrder={false}/>*/}
{/*
      
      <div>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
        <div style={{ paddingTop: "0px", paddingLeft: isSidebarOpen ? "250px" : "0" }}>
*/}

        <Routes>


          <Route path="/clothes" element={<Clothes/>}/>
          <Route path="/homePage" element={<Home/>}/>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
