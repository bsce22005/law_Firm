/* eslint-disable no-var */
"use server";
import mongoose from "mongoose";
import { Mongoose } from "mongoose";

declare global {
  var mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
}


const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined.");

let cached = global.mongoose || { conn: null, promise: null };

if (!cached) cached = global.mongoose = { conn: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;
  cached.conn = await mongoose
    .connect(MONGODB_URI as string)
    .then((mongoose) => {
      return mongoose;
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
      return null;
    });

  return cached.conn;
};

export default connectDB;
