import express from "express";
import { getServices, getService, addService, editService, deleteService } from "../controllers/services.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getServices);
router.get("/:id", auth, getService);
router.post("/", auth, addService);
router.patch("/:id", auth, editService);
router.delete("/:id", auth, deleteService);


export default router;