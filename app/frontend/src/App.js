// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router and Routes

import Header from './components/global-components/header';
import Footer from './components/global-components/footer';
import Home from './components/global-components/homepage';
import Wardrobe from './components/wardrobe-management/wardrobePage';
import AdminUpload from './components/wardrobe-management/adminUpload';
import VideoStream from './components/wardrobe-management/videoStream';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/wardrobe" element={<Wardrobe/>} />
          <Route path="/upload" element={<AdminUpload/>} />
          <Route path="/video" element={<VideoStream />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
