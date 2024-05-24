import express from "express";
import { getOrders, getOrder, addOrder, getCustomerOrders, getOrdersStatistics, editOrder, deleteOrder } from "../controllers/orders.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/statistics", auth, getOrdersStatistics);
router.get("/customer/:id", auth, getCustomerOrders);
router.get("/:id", auth, getOrder);
router.get("/", auth, getOrders);
router.post("/", auth, addOrder);
router.patch("/:id", auth, editOrder);
router.delete("/:id", auth, deleteOrder);


export default router;