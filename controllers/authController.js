import user from "../models/userModel.js";
import express from "express";
import bcrypt from "bcryptjs";
import { handleError } from "../utils/error.js";


const router = express.Router();

export const signup = async (req, res, next) => {

  const {name, email, password} = req.body;

  if (!name || !email || !password || name === "" || email === "" || password === "") {
    next(handleError(400, "All fields are required"));
  }


  const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });

    try {
          await newUser.save();
          res.json("signup successful");
    } catch (error)
       {
    next(error);
       }
};
