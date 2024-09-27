const express = require('express');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Clothing = require('../models/clothingSchema');

const app = express();

app.use(cors());
app.use(express.json());

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Files will be stored in the uploads directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique file name
    }
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload and save metadata to MongoDB
router.post('/admin/upload', upload.single('file'), async (req, res) => {
    const { clothingType, colors } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${file.filename}`; // File URL

    try {
        // Save the data to MongoDB
        const newClothing = new Clothing({
            clothingType,
            colors: colors.split(','), // Convert comma-separated string to array
            imageUrl
        });
        await newClothing.save();

        res.json({ message: 'Data saved successfully', imageUrl });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Route to match clothes based on colors
router.post('/match-clothes', async (req, res) => {
    const { colors } = req.body;

    try {
        // Query MongoDB for clothes with colors that match any of the provided colors
        const matchingClothes = await Clothing.find({ colors: { $in: colors } });

        res.json(matchingClothes);
    } catch (error) {
        console.error('Error fetching matching clothes:', error);
        res.status(500).json({ error: 'Failed to fetch matching clothes' });
    }
});

// Endpoint to fetch all images from the database
router.get('/all-clothes', async (req, res) => {
    try {
        const allClothes = await Clothing.find(); // Fetch all clothing documents from MongoDB
        res.json(allClothes); // Send the data back as a JSON response
    } catch (error) {
        console.error('Error fetching all clothes:', error);
        res.status(500).json({ error: 'Failed to fetch all clothes' });
    }
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

module.exports = router;
