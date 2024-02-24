import express from "express";
import mongoose from "mongoose";

const connectToMongoose = async () => {
  const connectURL =
    "mongodb+srv://barath0121:nFuAeH5md3xWuqNt@cluster0.a8ppubw.mongodb.net/iNotes?retryWrites=true&w=majority";
  try {
    await mongoose.connect(connectURL);
    console.log("connected to Database..");
  } catch (err) {
    console.log("Failed connecting to DB.");
  }
};

export default connectToMongoose;
