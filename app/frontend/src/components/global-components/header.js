import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex space-x-8 justify-center text-gray-700 font-medium">
          <li><a href="/" className="hover:text-blue-500 transition duration-300">Home</a></li>
          <li><a href="/" className="hover:text-blue-500 transition duration-300">New Arrivals</a></li>
          <li><a href="/wardrobe" className="hover:text-blue-500 transition duration-300">Virtual Closet</a></li>
          <li><a href="/" className="hover:text-blue-500 transition duration-300">Shop</a></li>
          <li><a href="/" className="hover:text-blue-500 transition duration-300">Gallery</a></li>
          <li><a href="/" className="hover:text-blue-500 transition duration-300">Blog</a></li>
          <li><a href="/" className="hover:text-blue-500 transition duration-300">Profile</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
