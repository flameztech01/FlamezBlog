import express from "express";
import { protect } from '../middleware/authMiddleware.js';
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

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

//Cloudinary Configuration with lowercase unserscores
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "flamezblog_uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({storage});

cloudinary.api.ping()
  .then(result => console.log('✅ Cloudinary connected successfully'))
  .catch(result => console.error('Cloudinary not fonneted', err.message));

// 🧠 Configure multer storage
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/'); // folder must exist
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

//Get all blogs
router.get('/', protect, getBlogs);

router.get('/myBlogs', protect, userBlogs);

router.get('/search/:category', protect, getBlogBySearch);

router.get('/:id', protect, getBlog);

router.post('/upload', protect, upload.single('image'), postBlog);

router.put('/update/:id', protect, updateBlog);

router.delete('/delete/:id', protect, deleteBlog);

export default router;