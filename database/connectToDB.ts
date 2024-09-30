import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return mongoose.connection;
  }

  try {
    const client = await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: process.env.MONGODB_DBNAME
    });

    isConnected = true;

    console.log("MongoDB connected");
    return client;
  } catch (error) {
    console.log("MONGO ERROR => ", error);
  }
};

export default connectToDB;