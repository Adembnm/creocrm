import express from "express";
import { getAppointments, getAppointment, addAppointment, editAppointment, deleteAppointment, getListCutomers, getNextAppointment } from "../controllers/appointments.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/next", auth, getNextAppointment);
router.get("/customers", auth, getListCutomers);
router.get("/", auth, getAppointments);
router.get("/:id", auth, getAppointment);
router.post("/", auth, addAppointment);
router.patch("/:id", auth, editAppointment);
router.delete("/:id", auth, deleteAppointment);


export default router;