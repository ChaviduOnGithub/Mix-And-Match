import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import for BrowserRouter and Routes

import React from 'react';

import Header from './components/global-components/header';
import Footer from './components/global-components/footer';
import Home from './components/global-components/homepage';
import Wardrobe from './components/wardrobe-management/wardrobePage';
import AdminUpload from './components/wardrobe-management/adminUpload';
import VideoStream from './components/wardrobe-management/videoStream';

import Clothes from './components/inventory-management/clothes';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/wardrobe" element={<Wardrobe/>} />
        <Route path="/upload" element={<AdminUpload/>} />
        <Route path="/video" element={<VideoStream />} />
        <Route path="/clothes" element={<Clothes/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
