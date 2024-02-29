import bcrypt from "bcrypt";
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

export const jwtValidateToken = () => {};
