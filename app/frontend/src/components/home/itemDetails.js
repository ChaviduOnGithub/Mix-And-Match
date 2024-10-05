import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ItemDetails = () => {
  const { item_code } = useParams(); // Get the item_code from the URL params
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  // Update the useEffect dependency to watch item_code changes
  useEffect(() => {
    fetchItemDetails(); // Fetch item details when component loads or when item_code changes
  }, [item_code]);

  // Function to fetch item details
  const fetchItemDetails = async () => {
    try {
      // Call to your backend to fetch item based on the item_code
      const response = await axios.get(`http://localhost:8070/home/${item_code}`);
      setItem(response.data); // Set the fetched item in the state
    } catch (err) {
      setError('Failed to fetch item details'); // Handle errors
    }
  };

  return (
    <div>
      {item ? (
        <div>
          <h2>{item.item_name}</h2>
          <p>Item Code: {item.item_code}</p>
          <p>Category: {item.category}</p>
          <p>Price: ${item.price}</p>
          {/* <p>Quantity: {item.quantity}</p> */}
          <img src={`http://localhost:8070${item.imageUrl}`} alt={item.item_name} width="200" />
        </div>
      ) : (
        <p>{error ? error : 'Loading item details...'}</p>
      )}
    </div>
  );
};

export default ItemDetails;
