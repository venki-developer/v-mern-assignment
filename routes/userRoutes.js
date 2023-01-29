import express from "express";
import { getUser, login, register } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/add-user').post(register);

router.route('/login-user').post(login);

router.route('/get-user-by-id').post(authMiddleware,getUser);

export default router;