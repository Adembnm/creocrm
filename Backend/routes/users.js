import express from "express";
import { getUsers, getUser, addUser, editUser, deleteUser, getStatistics, seedUsers  } from "../controllers/users.js";
import adminAuth from "../middleware/adminAuth.js";
import auth from "../middleware/auth.js";
import superAdminAuth from "../middleware/superAdminAuth.js";

const router = express.Router();

router.get("/seedUsers", seedUsers);
router.get("/statistics", superAdminAuth, getStatistics);
router.get("/", adminAuth, getUsers);
router.get("/:id", auth, getUser);
router.post("/", superAdminAuth, addUser);
router.patch("/:id", superAdminAuth, editUser);
router.delete("/:id", superAdminAuth, deleteUser);


export default router;