import { Request, Response } from "express";

//importing db models
import NotesModel from "../model/NotesModel";

export const createNewNote = async (req: Request, res: Response) => {
  const newNoteDetails = req.body;
  try {
    const newNoteData = await NotesModel.create(newNoteDetails);
    await newNoteData.save();
    res.status(200).json({ message: "New Note created..", newNoteData });
  } catch (err) {
    res.send(503).json({ message: "Error while creating Note", err });
  }
};

export const getNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const note = await NotesModel.findById(noteId);
  res.status(200).send(note);
};

export const getAllNotes = async (req: Request, res: Response) => {
  const allNotes = await NotesModel.find();
  res.status(200).send(allNotes);
};
