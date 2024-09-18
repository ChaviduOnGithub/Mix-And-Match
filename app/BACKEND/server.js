const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const session = require('express-session');

const userRouter =require ('./routes/user')
const authRouter=require('./routes/authRouter')
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

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


//routes
//app.use(express.json());
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
