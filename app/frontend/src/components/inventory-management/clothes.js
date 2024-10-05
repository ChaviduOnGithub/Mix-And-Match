/* global Chart */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';
import ClothesReturn from './return.js';
import jsPDF from 'jspdf';


export default function Clothes() {
    const [clothes, setClothes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedClothes, setSelectedClothes] = useState(null);
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [alertQuantity, setAlertQuantity] = useState('');
    const [supplier_id, setSupplierId] = useState('');
    const [error, setError] = useState('');
    const [quantityChartData, setQuantityChartData] = useState(null);
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [previousStockLevels, setPreviousStockLevels] = useState({});
    const [salesTracker, setSalesTracker] = useState({});
    const [initialStock, setInitialStock] = useState({});
    // const [calculatePurchasedQuantity, setcalculatePurchasedQuantity] = useState({})


    
    

    useEffect(() => {
        axios.get('http://localhost:8070/clothes/')
            .then((res) => {
                setClothes(res.data);

                // Track the initial stock levels
                const initialStockData = {};
                res.data.forEach(item => {
                    initialStockData[item.item_code] = item.quantity; // Store initial quantity for each item
                });
                setInitialStock(initialStockData);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    // Define resetForm function
    const resetForm = () => {
        setItemCode('');
        setItemName('');
        setCategory('');
        setPrice('');
        setQuantity('');
        setAlertQuantity('');
        setSupplierId('');
        setSelectedFile(null);
    };

    //Function to handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // Get the first file
        if (file) {
            setImage(file); // Store the image file in state
        }

        setSelectedFile(file);

        // Create a preview URL for the selected image
        const previewUrl = URL.createObjectURL(file);
        setImagePreviewUrl(previewUrl);
    };

    // Function to handle delete clothes
    const handleDeleteClothes = (itemCode) => {
        axios.delete(`http://localhost:8070/clothes/delete/${itemCode}`)
            .then(() => {
                setClothes(clothes.filter(clothes => clothes.item_code !== itemCode));
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    // Function to handle search
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    // Function to open add modal
    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    // Function to open update modal and set selected clothes
    const handleOpenUpdateModal = (clothes) => {
        setSelectedClothes(clothes);
        setItemCode(clothes.item_code);
        setItemName(clothes.item_name);
        setCategory(clothes.category);
        setPrice(clothes.price);
        setQuantity(clothes.quantity);
        setAlertQuantity(clothes.alert_quantity);
        setShowUpdateModal(true);
    };

    // Function to handle form submission for both create and update
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            setError('');

            if (!itemCode || !itemName || !category || !price || !quantity || !alertQuantity ) {
                setError('All fields are required.');
                return;
            }

            const formData = new FormData(); // Create a FormData object
            formData.append('item_code', itemCode);
            formData.append('item_name', itemName);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('alert_quantity', alertQuantity);
            formData.append('supplier_id', supplier_id);
            formData.append('file', selectedFile); // Append the image file

            if (selectedClothes) {
                // Get previous stock level before updating
                const previousQuantity = selectedClothes.quantity;
                const newQuantity = parseInt(quantity);

                // Store the reduction in stock
                const reducedQuantity = previousQuantity - newQuantity;
                console.log(`Item ${itemName} reduced by ${reducedQuantity} before restocking.`);
                
                await axios.put(`http://localhost:8070/clothes/update/${selectedClothes.item_code}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Set the content type for file uploads
                    }
                });

                // Update the previous stock level in the state
                setPreviousStockLevels((prev) => ({
                    ...prev,
                    [itemCode]: previousQuantity,
                }));

                resetForm();
                setShowUpdateModal(false);
            } else {
                // Check if the item code already exists
                const isDuplicate = clothes.some(clothes => clothes.item_code === itemCode);
                if (isDuplicate) {
                    setError('Item code already exists.');
                    return;
                }

                await axios.post('http://localhost:8070/clothes/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Set the content type for file uploads
                    }
                });

                resetForm();
                setShowAddModal(false);
            }

            window.location.reload();

            const res = await axios.get('http://localhost:8070/clothes/');
            setClothes(res.data);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred.');
        }
    };

    // Filter clothes based on search query
    const filteredClothes = clothes.filter(clothes =>
        clothes.item_code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    
    

    const generateReport = () => {
        // Function to calculate purchased quantity for each item
        const calculatePurchasedQuantity = (itemCode) => {
            const initialQuantity = initialStock[itemCode] || 0; // Get the initial quantity (fallback to 0 if not found)
            const currentItem = clothes.find(item => item.item_code === itemCode);
            const currentQuantity = currentItem ? currentItem.quantity : 0;
            return initialQuantity - currentQuantity; // Calculate the number of items purchased
        };       

        // Prepare the report data
        const reportData = clothes.map(item => {
            const purchasedQuantity = calculatePurchasedQuantity(item.item_code);

            return {
                itemName: item.item_name,
                initialQuantity: initialStock[item.item_code],
                currentQuantity: item.quantity,
                purchasedQuantity,
            };
        });

        // Calculate the most purchased items
        const mostPurchasedItems = clothes.map(item => {
            const purchasedQuantity = calculatePurchasedQuantity(item.item_code);
            return {
                itemName: item.item_name,
                purchasedQuantity,
            };
        }).filter(item => item.purchasedQuantity > 0); // Filter to show only those with sales

        // Generate the report in a new window
        const reportWindow = window.open("", "_blank", "width=800,height=600");

        // Write the report data into the new window
        reportWindow.document.write(`
            <html>
                <head><title>Clothes Stock Report</title></head>
                <body>
                    <h1>Clothes Stock Report</h1>
                    <table border="1" cellpadding="10" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Initial Quantity</th>
                                <th>Current Quantity</th>
                                <th>Purchased Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${reportData.map(item => `
                                <tr>
                                    <td>${item.itemName}</td>
                                    <td>${item.initialQuantity}</td>
                                    <td>${item.currentQuantity}</td>
                                    <td>${item.purchasedQuantity}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <h2>Most Purchased Items</h2>
                    <table border="1" cellpadding="10" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Purchased Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mostPurchasedItems.map(item => `
                                <tr>
                                    <td>${item.itemName}</td>
                                    <td>${item.purchasedQuantity}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <button onclick="window.print()">Print Report</button>
                </body>
            </html>
        `);

        reportWindow.document.close();
    };

    const generateReportPDF = () => {
        const doc = new jsPDF();

        // Function to calculate purchased quantity for each item
        const calculatePurchasedQuantity = (itemCode) => {
            const initialQuantity = initialStock[itemCode] || 0; // Get the initial quantity (fallback to 0 if not found)
            const currentItem = clothes.find(item => item.item_code === itemCode);
            const currentQuantity = currentItem ? currentItem.quantity : 0;
            return initialQuantity - currentQuantity; // Calculate the number of items purchased
        };
        
        // Set title and headers
        doc.setFontSize(18);
        doc.text("Clothes Stock Report", 14, 22);
        doc.setFontSize(12);
        doc.text("Item Name", 14, 40);
        doc.text("Initial Quantity", 64, 40);
        doc.text("Current Quantity", 114, 40);
        doc.text("Purchased Quantity", 164, 40);
    
        // Add the report data
        let y = 50;
        clothes.forEach(item => {
            const purchasedQuantity = calculatePurchasedQuantity(item.item_code);
            doc.text(item.item_name, 14, y);
            doc.text(String(initialStock[item.item_code]), 64, y);
            doc.text(String(item.quantity), 114, y);
            doc.text(String(purchasedQuantity), 164, y);
            y += 10;  // Move to next line
        });
    
        // Save the PDF
        doc.save('clothes_stock_report.pdf');
    };
    
    

    const [selectedItemForDelete, setSelectedItemForDelete] = useState(null);

    // Function to open delete confirmation modal
    const handleOpenDeleteConfirmationModal = (clothes) => {
        setSelectedItemForDelete(clothes);
    };

    // Function to handle canceling deletion
    const handleCancelDelete = () => {
        setSelectedItemForDelete(null);
    };

    // Function to handle confirming deletion
    const handleConfirmDelete = () => {
        if (selectedItemForDelete) {
            handleDeleteClothes(selectedItemForDelete.item_code);
            setSelectedItemForDelete(null); // Close the modal after deletion
        }
    };
    
    
    

    return (
            <ClothesReturn
                clothes={clothes}
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                handleOpenAddModal={handleOpenAddModal}
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
                handleFormSubmit={handleFormSubmit}
                error={error}
                itemCode={itemCode}
                setItemCode={setItemCode}
                itemName={itemName}
                setItemName={setItemName}
                category={category}
                setCategory={setCategory}
                price={price}
                setPrice={setPrice}
                quantity={quantity}
                setQuantity={setQuantity}
                alertQuantity={alertQuantity}
                setAlertQuantity={setAlertQuantity}
                supplierId={supplier_id}
                setSupplierId={setSupplierId}
                handleImageUpload={handleImageUpload}
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                selectedItemForDelete={selectedItemForDelete}
                handleCancelDelete={handleCancelDelete}
                handleConfirmDelete={handleConfirmDelete}
                filteredClothes={filteredClothes}
                handleOpenUpdateModal={handleOpenUpdateModal}
                handleOpenDeleteConfirmationModal={handleOpenDeleteConfirmationModal}
                generateReportPDF={generateReportPDF}
                generateReport={generateReport}
            /> 
            
    );
}
