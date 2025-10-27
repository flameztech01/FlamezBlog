import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';
import generateToken from '../utils/generateToken.js';

//Auth User/set token
//Route POST /api/users/auth
const authUser = asyncHandler(async (req, res, next) => {
    const {name, email, password} = req.body;

    const user = await User.findOne({email});

    if(user &&(await user.matchPassword(password))) {
      const token = generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } else{
        res.status(400);
        throw new Error('Invalid Email or Password');
    }
});

//Register a new User
//Route POST /api/users
//@@Access Public
const registerUser = asyncHandler(async (req, res, next) => {
  const {name, email, password} = req.body;

  const userExists = await User.findOne({email});

  if(userExists) {
    res.status(400);
    throw new Error('user Already Exists');
  }

  const user = await User.create({
    name, email, password
  });

  if(user) {
    const token = generateToken(res, user._id);
    res.status(201).json({
        _id: user._id,
        name: user.name,
        password: user.password,
        token,
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data');
  }
});

//Logout User
//Route POST /api/users/logout
//@@Access Public
const logoutUser = asyncHandler(async (req, res, next) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({message: 'User Logged Out'});
});

//Get User Profile
//Route GET /api/users/profile
//@@Access Private
const getUserProfile = asyncHandler(async (req, res, next) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    };
    res.status(200).json(user);
});

//Update User profile
//Route PUT /api/users/profile
const updateUserProfile = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.user._id); // ✅ Corrected

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password; // will be hashed by pre('save')
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
    authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile
};