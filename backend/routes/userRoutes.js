import express from 'express';
const router = express.Router();
import { authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';


//Auth user/set token
router.post('/auth', authUser);

//Register a new user
router.post('/', registerUser);

//Logout User
router.post('/logout', logoutUser);

//Get/Update user profile
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;