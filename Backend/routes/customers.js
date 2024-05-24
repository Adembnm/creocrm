import express from "express";
import { getCustomersListNames, getCustomers, getCustomer, addCustomer, editCustomer, deleteCustomer, getCustomersList,  getCustomersStatistics, getUnpaidCustomers,  } from "../controllers/customers.js";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get('/unpaid', auth, getUnpaidCustomers);
router.get('/statistics', auth, getCustomersStatistics);
router.get('/listNames', auth, getCustomersListNames);
router.get('/list', auth, getCustomersList);
router.get("/", auth, getCustomers);

router.get("/:id", getCustomer);

router.post("/", addCustomer);
router.patch("/:id", editCustomer);
router.delete("/:id", deleteCustomer);


export default router;