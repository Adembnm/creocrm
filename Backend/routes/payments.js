import express from "express";
import { getPayments, getPayment, addPayment, editPayment, deletePayment } from "../controllers/payments.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getPayments);
router.get("/:id", auth, getPayment);

router.post("/", auth, addPayment);
router.patch("/:id", auth, editPayment);
router.delete("/:id", auth, deletePayment);


export default router;