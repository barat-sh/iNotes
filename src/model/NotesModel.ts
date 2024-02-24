import mongoose, { Schema, Document } from "mongoose";

const NotesSchema: Schema = new mongoose.Schema(
  {
    noteTitle: {
      type: String,
      requried: true,
    },
    notesCode: {
      type: String,
    },
    notesDescription: {
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
