const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

connectDB(); 
const app = express();

app.use(express.json()); //to accept JSON data

app.get('/', (req, res) => {
    res.send("Api is running succesfully");
});

app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000 

app.listen(5000, console.log("Server started successfully"));

