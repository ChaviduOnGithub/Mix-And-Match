/* global Chart */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';
import ClothesReturn from './return.js';


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
    const [supplierId, setSupplierId] = useState('');
    const [error, setError] = useState('');
    const [quantityChartData, setQuantityChartData] = useState(null);
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    
    

    useEffect(() => {
        axios.get('http://localhost:8070/clothes/')
            .then((res) => {
                setClothes(res.data);
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
        setSupplierId(clothes.supplierId);
        setShowUpdateModal(true);
    };

    // Function to handle form submission for both create and update
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            setError('');

            if (!itemCode || !itemName || !category || !price || !quantity || !alertQuantity || !supplierId || !selectedFile) {
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
            formData.append('supplier_id', supplierId);
            formData.append('file', selectedFile); // Append the image file

            if (selectedClothes) {
                await axios.put(`http://localhost:8070/clothes/update/${selectedClothes.item_code}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Set the content type for file uploads
                    }
                });

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
        const totalQuantity = clothes.reduce((total, clothes) => total + clothes.quantity, 0);
    
        const printWindow = window.open("", "_blank", "width=600,height=600");
        printWindow.document.write(`
            
        `);
        printWindow.document.close();
        
        printWindow.downloadCustomerReport = () => {
            const pdfContent = printWindow.document.documentElement.outerHTML;
            const pdfBlob = new Blob([pdfContent], { type: "application/pdf" });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            const a = document.createElement("a");
            a.href = pdfUrl;
            a.download = "clothes_stock_report.pdf";
            a.click();
            URL.revokeObjectURL(pdfUrl);
            printWindow.close();
        };
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
            supplierId={supplierId}
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
            generateReport={generateReport}
        /> 

            
    );
}
