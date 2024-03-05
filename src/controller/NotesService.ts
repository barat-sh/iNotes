import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

//importing db models
import NotesModel from "../model/NotesModel";

export const createNewNote = async (req: Request, res: Response) => {
  // user Authentication
  const jwtAccessToken = req.cookies["accessToken"];
  const secret = process.env.TOKEN_VALIDATION_KEY || "";

  try {
    const validUser = jwt.verify(jwtAccessToken, secret) as JwtPayload;

    if (!validUser) {
      res.status(400).json({ error: "User is not authenticated!" });
      return;
    }
    // user Authentication

    const { Title, Description, Link, Code } = req.body;
    const newNoteDetails = {
      Title: Title,
      Description: Description,
      Link: Link,
      Code: Code,
      user: validUser.id,
    };
    try {
      const newNoteData = await NotesModel.create(newNoteDetails);
      await newNoteData.save();
      res.status(200).json({ message: "New Note created..", newNoteData });
    } catch (err) {
      res.send(503).json({ message: "Error while creating Note", err });
    }
  } catch (err) {
    res.status(500).json({ message: "error while creating new note!" });
    return;
  }
};

export const getNote = async (req: Request, res: Response) => {
  // user Authentication
  const jwtAccessToken = req.cookies["accessToken"];
  const secret = process.env.TOKEN_VALIDATION_KEY || "";

  try {
    const validUser = jwt.verify(jwtAccessToken, secret) as JwtPayload;

    if (!validUser) {
      res.status(400).json({ error: "User is not authenticated!" });
      return;
    }
    const { noteId } = req.params;
    const note = await NotesModel.findById(noteId);
    res.status(200).send(note);
  }catch(err){
    res.status(300).json({error: err})
  }
  // user Authentication


};

export const getAllNotes = async (req: Request, res: Response) => {
  const allNotes = await NotesModel.find();
  res.status(200).send(allNotes);
};
