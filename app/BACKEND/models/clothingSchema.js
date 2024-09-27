const mongoose = require('mongoose');

// Define schema for clothing data
const clothingSchema = new mongoose.Schema({
    clothingType: { type: String, required: true },
    colors: { type: [String], required: true },
    imageUrl: { type: String, required: true }
});

// Create a model from the schema
const Clothing = mongoose.model('Clothing', clothingSchema);

module.exports = Clothing;
