import express from "express";
import { login} from "../controllers/auth.js";
const router = express.Router();

router.post("/login", login);
//router.get("/getUser", getUser);


export default router;