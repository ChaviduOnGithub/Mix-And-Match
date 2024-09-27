import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WardrobePage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [matchingClothes, setMatchingClothes] = useState([]);
    const [allClothes, setAllClothes] = useState([]); // State to hold all clothes data

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log('Selected file:', file); // Debug statement to check file selection

        // Create a preview URL for the selected image
        const previewUrl = URL.createObjectURL(file);
        setImagePreviewUrl(previewUrl);
        console.log('Image preview URL created:', previewUrl); // Debug statement to check preview URL
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select a file first!');
            console.log('No file selected!'); // Debug statement for no file scenario
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        console.log('FormData created with file:', formData); // Debug statement to check FormData

        try {
            // Step 1: Send the image to the Flask backend
            console.log('Sending image to Flask backend...');
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Received response from Flask backend:', response.data); // Debug statement to check Flask response

            // Extract predicted colors and clothing data from Flask response
            const { class: classIndex, clothing_name, colors } = response.data;
            setPrediction({ classIndex, clothing_name, colors });
            console.log('Prediction data set:', { classIndex, clothing_name, colors }); // Debug statement to check prediction data

            // Step 2: Send the colors to the Express backend to fetch matching clothes
            console.log('Sending colors to Express backend...');
            const matchResponse = await axios.post('http://localhost:8070/api/match-clothes', { colors });
            console.log('Received response from Express backend:', matchResponse.data); // Debug statement to check matching clothes response

            // Check if there is at least one matching color
            if (matchResponse.data.length > 0) {
                setMatchingClothes(matchResponse.data); // Store matching clothes data in state
            } else {
                console.log('No matching clothes found.');
                setMatchingClothes([]);
            }
        } catch (error) {
            console.error('Error during image prediction or matching clothes:', error); // Debug statement for errors
        }
    };

    // Fetch all images when the component mounts
    useEffect(() => {
        const fetchAllClothes = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/all-clothes');
                setAllClothes(response.data); // Set all clothes data to state
                console.log('All clothes data fetched:', response.data); // Debug statement
            } catch (error) {
                console.error('Error fetching all clothes:', error); // Debug statement
            }
        };

        fetchAllClothes();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Upload Image for Prediction</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100"
                />
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded shadow-md hover:bg-indigo-700">
                    Submit
                </button>
            </form>
            {imagePreviewUrl && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Image Preview</h2>
                    <img src={imagePreviewUrl} alt="Preview" className="max-w-full h-auto rounded shadow-md" />
                </div>
            )}
            {prediction && (
                <div className="mt-6 p-4 border border-gray-300 rounded shadow-md">
                    <p className="font-medium">Predicted Class Index: {prediction.classIndex}</p>
                    <p className="font-medium">Predicted Clothing Name: {prediction.clothing_name}</p>
                    <div className="mt-4">
                        <h3 className="font-semibold">Dominant Colors:</h3>
                        <div className="flex gap-2 mt-2">
                            {prediction.colors.map((color, index) => (
                                <div
                                    key={index}
                                    style={{ backgroundColor: color }}
                                    className="w-12 h-12 rounded-full shadow-md flex items-center justify-center"
                                >
                                    <span className="text-xs text-white">{color}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {matchingClothes.length > 0 && (
                <div className="mt-6 p-4 border border-gray-300 rounded shadow-md">
                    <h3 className="font-semibold mb-2">Matching Clothes:</h3>
                    <div className="flex flex-wrap gap-4">
                        {matchingClothes.map((item, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <img src={item.imageUrl} alt={item.clothingType} className="w-24 h-24 rounded shadow-md" />
                                <p className="text-sm">{item.clothingType}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Section to display all images from the database */}
            <div className="mt-6 p-4 border border-gray-300 rounded shadow-md">
                <h3 className="font-semibold mb-2">All Clothes:</h3>
                <div className="flex flex-wrap gap-4">
                    {allClothes.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <img src={item.imageUrl} alt={item.clothingType} className="w-24 h-24 rounded shadow-md" />
                            <p className="text-sm">{item.clothingType}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WardrobePage;
