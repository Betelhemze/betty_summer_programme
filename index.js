import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import loginRoutes from "./routes/loginRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";


dotenv.config();



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is Connected!"))
  .catch(err => console.error("Connection error", err));

  const app = express();

  app.use(express.json());
  app.use(cors({ origin: "http://localhost:3000" }));

  const _filename = fileURLToPath(import.meta.url);
  const _dirname = path.dirname(_filename);
  app.use(express.static(path.join(_dirname, "public")));

 app.listen(3000, () => {
   console.log("Server is running on port 3000");
 });

 app.use("/api/users", router);

 app.use("/api", authRoutes);

 app.use("/api", loginRoutes);

app.get("/", (req, res) => {
    res.send("Hello basic World!!!")
    });
    app.post("/api/signup", async (req, res) => {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).send("All fields required");
      }
      // TODO: Save user in DB
      res.status(200).send("User created");
    });

    app.post("/api/login", async (req, res) => {
      const { email, password } = req.body;
      // TODO: Check user from DB
      res.status(200).send("Login successful");
    });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message,
    });


    
});


   