import express from 'express';
const router = express.Router();
import { createABlog, getAllBlogs, getBlogData, getUserBlogs } from '../controllers/blogsController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route("/").get(getAllBlogs);
router.route("/myblogs").get(protect, getUserBlogs);
router.route("/:id").get(protect, getBlogData);
router.route("/").post(protect, createABlog)

export default router;