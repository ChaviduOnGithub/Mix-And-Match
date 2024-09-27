// src/App.js
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router and Routes

import Header from './components/global-components/header';
import Footer from './components/global-components/footer';
import Home from './components/global-components/homepage';
import Wardrobe from './components/wardrobe-management/wardrobePage';
import AdminUpload from './components/wardrobe-management/adminUpload';
import VideoStream from './components/wardrobe-management/videoStream';

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
      <Header />
        <Routes>

          <Route path="/" element={<Home />} /> 
          <Route path="/wardrobe" element={<Wardrobe/>} />
          <Route path="/upload" element={<AdminUpload/>} />
          <Route path="/video" element={<VideoStream />} />

          <Route path="/clothes" element={<Clothes/>}/>

        </Routes>

        <Footer />  
    </BrowserRouter>

  );
}

export default App;
