import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter valid Email"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password should contain minimum length of 8 character!"],
      trim: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const AuthModel = mongoose.model("AuthModel", AuthSchema);

export default AuthModel;
