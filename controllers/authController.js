import User from "../models/userModel.js";
import express from "express";
import bcrypt from "bcryptjs";
import { handleError } from "../utils/error.js";


const router = express.Router();

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log("Received:", req.body);


  if (!name || !email || !password) {
    return next(handleError(400, "All fields are required"));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(handleError(400, "Email already in use"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });


    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};