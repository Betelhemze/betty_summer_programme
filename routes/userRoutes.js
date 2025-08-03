import express from "express";

const router = express.Router();

import { tests } from "../controllers/userController.js";

router.get("/test", tests);



export default router;