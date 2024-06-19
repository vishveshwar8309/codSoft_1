import express from 'express';
const router = express.Router();
import { authenticateUser, logoutUser, registerUser, updateUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route("/signin").post(authenticateUser)
router.route("/register").post(registerUser);
router.route('/logout').post(protect, logoutUser)
router.route('/update').put(protect, updateUser)
export default router;