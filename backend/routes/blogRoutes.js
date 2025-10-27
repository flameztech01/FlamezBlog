import express from "express";
import { protect } from '../middleware/authMiddleware.js';
import multer from "multer";
import {
    getBlogs,
    userBlogs,
    getBlogBySearch,
    getBlog,
    postBlog,
    updateBlog,
    deleteBlog
} from '../controllers/blogController.js';

const router = express.Router();

// 🧠 Configure multer storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // folder must exist
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//Get all blogs
router.get('/', protect, getBlogs);

router.get('/myBlogs', protect, userBlogs);

router.get('/search/:category', protect, getBlogBySearch);

router.get('/:id', protect, getBlog);

router.post('/upload', protect, upload.single('image'), postBlog);

router.put('/update/:id', protect, updateBlog);

router.delete('/delete/:id', protect, deleteBlog);

export default router;