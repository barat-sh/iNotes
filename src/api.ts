import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// configuring env files
import { config } from "dotenv";
config();

// initializing port
const PORT = 3001;

//connecting to DB
import connectToMongoose from "./config/DB";

// importing routes
import NotesRoute from "./routes/notesRoute";

// using Routes
app.use("/api", NotesRoute);

app.get("/ping", (req, res) => {
  res.status(200).send("Server is up*");
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

// Listening to port
app.listen(PORT, async () => {
  await connectToMongoose();
  console.log(`Sever hitting in port -> ${PORT}`);
});
