import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [cartTotal, setCartTotal] = useState(0);
    const [shippingFee, setShippingFee] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const res = await axios.get('http://localhost:8070/cart/');
            setCartItems(res.data);
            calculateCartTotal(res.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const calculateCartTotal = (items) => {
        let total = 0;
        items.forEach(item => {
            total += item.cPrice * item.cQuantity;
        });
        setCartTotal(total);
        setShippingFee(total > 0 ? 0 : 10); // Example shipping fee logic
    };

    const handleQuantityChange = async (id, quantity) => {
        try {
            await axios.put(`http://localhost:8070/cart/update/${id}`, { cQuantity: quantity });
            fetchCartItems();
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/cart/delete/${id}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
    };

    const handleApplyPromoCode = () => {
        // Logic for applying promo code 
        alert('Promo code applied!');
    };

    //CSS Styles
    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: '"Arial", sans-serif',
        },
        heading: {
            fontSize: '24px',
            marginBottom: '20px',
            color: '#333',
        },
        cartItems: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        cartItem: {
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            borderBottom: '1px solid #ddd',
        },
        img: {
            width: '100px',
            height: 'auto',
            marginRight: '15px',
        },
        cartDetails: {
            flex: '1',
        },
        cartTotals: {
            marginTop: '20px',
            padding: '20px',
            borderTop: '1px solid #ddd',
        },
        totalsTitle: {
            fontSize: '18px',
            marginBottom: '10px',
        },
        promoCode: {
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
        },
        input: {
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            flex: '1',
        },
        button: {
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Shopping Cart</h2>
            <div style={styles.cartItems}>
                {cartItems.map(item => (
                    <CartItem
                        key={item._id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemoveItem={handleRemoveItem}
                        styles={styles.cartItem} // Pass styles if needed
                    />
                ))}
            </div>
            <div style={styles.cartTotals}>
                <h3 style={styles.totalsTitle}>Cart Totals</h3>
                <p>Subtotal: ${cartTotal.toFixed(2)}</p>
                <p>Shipping Fee: ${shippingFee.toFixed(2)}</p>
                <p>Total: ${(cartTotal + shippingFee).toFixed(2)}</p>
                <div style={styles.promoCode}>
                    <input
                        type="text"
                        value={promoCode}
                        onChange={handlePromoCodeChange}
                        placeholder="Enter promo code"
                        style={styles.input}
                    />
                    <button onClick={handleApplyPromoCode} style={styles.button}>Apply</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
