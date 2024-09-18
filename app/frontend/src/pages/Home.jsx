import React from 'react';
import '../App.css';

const Home = () => {
  return (
    <div
      className="container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <h1>Welcome to the Home Page</h1>
      <p>Mix And Match.</p>
    </div>
  );
};

export default Home;
