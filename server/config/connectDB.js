import mongoose from "mongoose";

// Define the connection string (Check if you used MONGO_URI or MONGODB_URI in Vercel)
const URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env");
}

// Global variable to cache the connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // 1. If a connection already exists, return it immediately (High Speed!)
  if (cached.conn) {
    return cached.conn;
  }

  // 2. If no connection exists, create a new one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // FAIL FAST: Don't hang if connection is bad
    };

    console.log("⏳ Initializing new MongoDB connection...");
    
    cached.promise = mongoose.connect(URI, opts).then((mongoose) => {
      console.log("✅ New MongoDB Connection Established");
      return mongoose;
    });
  }

  // 3. Await the promise
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ MongoDB Connection Error:", e);
    throw e;
  }

  return cached.conn;
};

export default connectDB;