import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);
        
        // ኣብዚ ግበሮ
        await mongoose.connect(process.env.MONGO_URI, {
            family: 4 
        });
        
        console.log("MongoDB Connected Successfully!");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

export default connectDB;