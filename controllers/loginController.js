import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Email not registered");
    }

    // 2. Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Incorrect password");
    }

    // 3. Success response
    res.status(200).send("Login successful");
  } catch (err) {
    res.status(500).send("Server error");
  }
};
