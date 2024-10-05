import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const CartDashboard = () => {
    const [cartItems, setCartItems] = useState([]);
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

    const generateReport = () => {
        const doc = new jsPDF();
        let y = 10;
        doc.text('Shopping Cart Report', 10, y);
        y += 10;
        doc.text('Item List:', 10, y);
        y += 10;

        cartItems.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.cItemName} - Quantity: ${item.cQuantity} - Price: $${item.cPrice}`, 10, y);
            y += 10;
        });

        y += 10;
        doc.text(`Subtotal: $${cartTotal.toFixed(2)}`, 10, y);
        y += 10;
        doc.text(`Shipping Fee: $${shippingFee.toFixed(2)}`, 10, y);
        y += 10;
        doc.text(`Total: $${(cartTotal + shippingFee).toFixed(2)}`, 10, y);

        doc.save('cart_report.pdf');
    };

    // CSS Styles
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
        report: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        totals: {
            marginTop: '20px',
            padding: '20px',
            borderTop: '1px solid #ddd',
        },
        button: {
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '20px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Cart Report</h2>
            <div style={styles.report}>
                {cartItems.map((item, index) => (
                    <div key={item._id}>
                        <p>{index + 1}. {item.cItemName} - Quantity: {item.cQuantity} - Price: ${item.cPrice}</p>
                    </div>
                ))}
            </div>
            <div style={styles.totals}>
                <h3>Totals</h3>
                <p>Subtotal: ${cartTotal.toFixed(2)}</p>
                <p>Shipping Fee: ${shippingFee.toFixed(2)}</p>
                <p>Total: ${(cartTotal + shippingFee).toFixed(2)}</p>
            </div>
            <button onClick={generateReport} style={styles.button}>Download PDF Report</button>
        </div>
    );
};

export default CartDashboard;
