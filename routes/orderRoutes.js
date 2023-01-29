import express from "express";
import { addOrder, getOrderById } from "../controllers/orderController.js";


const router = express.Router();

router.route('/add-order').post(addOrder);
router.route('/get-order/:userId').get(getOrderById);

export default router;