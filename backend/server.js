const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const {notFound , errorHandler } = require("./middleware/errorMiddleware")
const { axios } = require ("axios"); 

dotenv.config();

connectDB(); 
const app = express();

app.use(express.json()); //to accept json data

app.get("/", (req, res) => {
    res.send("API is running successfully");
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

//proper message for error , error handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000 

app.listen(5000, console.log("Server started successfully"));

