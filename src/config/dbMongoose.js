import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

//initially connecting mongodb locally
// using package - mongoose.

export const connectToDbMongoose = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to Database successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
