import express, { Response, Request } from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.send("hello");
});

export default router;
