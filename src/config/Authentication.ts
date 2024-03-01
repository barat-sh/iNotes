import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const passwordHash = async (password: string) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log("Error hashing password", err);
    } else {
      console.log("Hashing", hash);
      return hash;
    }
  });
};

export const passwordValidation = async (
  password: string,
  hashedPassword: string,
) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (err) {
    console.log("Incorrect password", err);
    return false;
  }
};

export const jwtGenerateToken = async (payload: any) => {
  const secret: string = process.env.TOKEN_VALIDATION_KEY || "";
  if (secret == "") {
    return "";
  }
  return jwt.sign(payload, secret);
};

export const jwtValidateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const secret: string = process.env.TOKEN_VALIDATION_KEY || "";
  const jwtAccessToken = req.cookies["accessToken"];
  if (!jwtAccessToken)
    return res.status(400).json({ error: "user not authenticated!" });
  try {
    const validToken = jwt.verify(jwtAccessToken, secret);
    if (validToken) {
      console.log(validToken);
      next();
      return;
    }
  } catch (err) {
    return res.status(400).json({ error: "user not authenticated!" });
  }
};
