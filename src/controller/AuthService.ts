import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      res.cookie("token", jwtToken);
      res.status(200).json({
        message: "User Logged in!..",
        id: alreadyExists?._id,
        email: alreadyExists?.email,
        name: alreadyExists?.name,
        createdAt: alreadyExists?.createdAt,
      });
      return;
    }
  } else {
    res.status(500).json({ message: "Incorrect email or password!" });
    return;
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  const jwtExtractedid = (await jwt.verify(
    token,
    process.env.TOKEN_VALIDATION_KEY || "",
  )) as any;

  console.log(jwtExtractedid);
  const userDetail = await AuthModel.findById(jwtExtractedid.id);
  if (userDetail) {
    res.status(200).send(userDetail);
  } else {
    res.status(500).json({ message: "error while fetching user" });
  }
};
