import mongoose, { Schema, Document } from "mongoose";
import AuthModel from "./AuthModel";

const NotesSchema: Schema = new mongoose.Schema(
  {
    Title: {
      type: String,
      requried: true,
    },
    Code: {
      type: String,
    },
    Description: {
      type: String,
    },
    Link: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'AuthModel',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const NotesModel = mongoose.model("NotesModel", NotesSchema);

export default NotesModel;
