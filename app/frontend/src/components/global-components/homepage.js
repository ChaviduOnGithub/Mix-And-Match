
import React from 'react';

import Gallery from './gallery';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      

      {/* Main Content */}

      <Gallery />



      <main className="flex-grow p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About Us</h2>
          <p>
            This is a simple home page example built with React and styled using Tailwind CSS. 
            It is designed to be responsive and adjusts its layout based on the screen size.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
          <p>
            We provide a range of services that cater to different needs. 
            Please browse our website to learn more.
          </p>
        </section>
      </main>

      
     
    </div>
  );
};

export default Home;
