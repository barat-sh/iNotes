import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

import {
  passwordValidation,
  jwtGenerateToken,
  jwtValidateToken,
} from "../config/Authentication";

// importing Model
import AuthModel from "../model/AuthModel";

export const Register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const alreadyExists = await AuthModel.findOne({ email });
  if (alreadyExists) {
    res.status(503).json({ message: "User alreadyExists!" });
    return;
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserDetails = {
      email: email,
      password: hashedPassword,
      name: name,
    };
    const newUserData = await AuthModel.create(newUserDetails);
    res.json({ message: "New user created" });
    return;
  }
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const alreadyExists = await AuthModel.findOne({
    email: email.toLowerCase(),
  }).select("+password");
  if(alreadyExists){
    const checkPassword = await passwordValidation(
      password,
      alreadyExists?.password || "",
    );
    if (checkPassword) {
      const payload = {
        id: alreadyExists?._id,
      };
      const jwtToken = await jwtGenerateToken(payload);
      if (jwtToken === "") {
        res.status(500).json({ message: "error while logging in.." });
        return;
      } else {
        res.cookie("accessToken", jwtToken, {
          maxAge: 60 * 60 * 24 * 90 * 1000,
          httpOnly: true,
        });
        res.status(200).json({
          message: "User Logged in!..",
        });
        return;
      }
    } else {
      res.status(500).json({ message: "Incorrect email or password!" });
      return;
    }
  }else{
    res.status(500).json({message: "user does not exists!"})
  }
};

export const getProfile = async (req: Request, res: Response) => {
  // user Authentication
  const jwtAccessToken = req.cookies["accessToken"];
  const secret = process.env.TOKEN_VALIDATION_KEY || "";

  const validUser = jwt.verify(jwtAccessToken, secret) as JwtPayload;

  if (!validUser)
    return res.status(400).json({ error: "User is not authenticated!" });
  // user Authentication
  const userProfileDetail = await AuthModel.findById(validUser.id);

  console.log(userProfileDetail);
  res.send(userProfileDetail);
};
