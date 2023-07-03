const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           
        });
        console.log("Mongo db connected");
    }
        catch (error) {
            console.error(error.message);
            process.exit();
            
        }
    
};

module.exports = connectDB; 