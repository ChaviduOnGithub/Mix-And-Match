import fallbackImage from '../../images/Black_Tee.png.webp';

const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
    const imageUrl = `http://localhost:8070/home/${item.cImage}`;
    const { _id, cImage, cItemName, cPrice, cQuantity, cSize } = item; // Include cSize in destructuring

    // Log the image URL to ensure it's correct
    console.log('Image URL:', imageUrl);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity > 0) {
            onQuantityChange(_id, newQuantity);
        }
    };

    return (
        <div className="cart-item">
            <img 
                src={imageUrl} 
                alt={item.cItemName} 
                className="cart-item-image" 
                onError={(e) => e.target.src = fallbackImage} // Fallback image
            />
            <div className="cart-item-details">
                <h4>{item.cItemName}</h4>
                <p>Price: ${cPrice}</p>
                <p>Size: {cSize}</p> {/* Display the size */}
                <p>Quantity: 
                    <input 
                        type="number" 
                        value={cQuantity} 
                        onChange={handleQuantityChange} 
                    />
                </p>
                <p>Total: ${(cPrice * cQuantity).toFixed(2)}</p>
                <button onClick={() => onRemoveItem(_id)}>Remove</button>
            </div>
        </div>
    );
};

export default CartItem;
