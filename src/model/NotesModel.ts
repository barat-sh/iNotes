import mongoose, { Schema, Document } from "mongoose";

const NotesSchema: Schema = new mongoose.Schema(
  {
    noteTitle: {
      type: String,
      requried: true,
    },
    noteCode: {
      type: String,
    },
    noteDescription: {
      type: String,
    },
    imageLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const NotesModel = mongoose.model("NotesModel", NotesSchema);

export default NotesModel;
