const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const session = require('express-session');

//Devinda 
const CartRouter = require('./routes/cart_management/cart')

//thimin
const CartClothesRouter = require('./routes/CartClothesRoutes')


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;
console.log("MongoDB URL: ", URL); // Debugging: Check if URL is loaded

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB connection success!");
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});



app.use("/cart",CartRouter);
app.use("/home",CartClothesRouter);