import mongoose from 'mongoose';

const dbName = 'Assignment_7';

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
        console.log(`Connected to ${dbName} Database`);
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};

export default connectDB;