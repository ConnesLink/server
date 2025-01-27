import mongoose from 'mongoose';

const connectDB = async () => {
  console.log('🚀 Attempting MongoDB connection');
  try {
    if (
      process.env.MONGODB_URI === undefined ||
      process.env.MONGODB_URI === '' ||
      process.env.MONGODB_URI === null
    ) {
      console.log(
        '😱 MongoDB connection URI is not set! Set it in the .env file.'
      );
      process.exit(1);
    }
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`🎉 MongoDB Connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error('😱 Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
