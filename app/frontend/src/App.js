import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Clothes from './components/inventory-management/clothes';

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

        </Routes>
    </BrowserRouter>
  );
}

export default App;
