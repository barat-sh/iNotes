import express, { Response, Request } from "express";
const router = express.Router();

// Importing DB-Models
import NotesModel from "../model/NotesModel";

// importing controller functions
import {
  getAllNotes,
  createNewNote,
  getNote,
} from "../controller/NotesService";

// using controller functions
router.get("/getAllNotes", getAllNotes);
router.post("/createNewNote", createNewNote);
router.get("/getNote/:noteId", getNote);

export default router;
