import express from "express";
import Blog from '../models/blogModels.js';

//Get all blogs 
const getBlogs = async (req, res, next) => {
    const limit = parseInt(req.query.limit);
    let query = Blog.find().sort({createdAt: -1});

    if(!isNaN(limit) && limit > 0) {
        query = query(limit)
    }
    const blogs = await query;
    res.json(blogs);
};

//Get blog posted by user
const userBlogs = async (req, res, next) => {
    const userId = req.user._id;

    const userBlog = await Blog.find({user: userId}).sort({createdAt: -1});
    res.status(200).json(userBlog);
};

//Get single Blog by searching by category
const getBlogBySearch = async(req, res, next) => {
    const {category} = req.params;
    const search = await Blog.find({category: {$regex: new RegExp(category, 'i')}});

    if(!search) {
        res.status(404);
        throw new Error('Category does not exist')
    }

    res.status(201).json(search);
};

//Get Blog
const getBlog = async (req, res, next) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if(!blog) {
        res.status(404);
        throw new Error('Blog not found');
        return;
    }

    res.status(200).json(blog);
}

//Create Blog
const postBlog = async (req, res, next) => {
    const {title, description, author, category,  content, date} = req.body;

    if(!req.file) {
        return res.status(400).json({message: 'No image file uploaded'});
    }

    const newBlog =  await Blog.create({
        user: req.user._id,
        title, 
        description, 
        author: req.user.name , 
        category, 
        image: `uploads/${req.file.filename}`, 
        content, 
        date,
    });

    res.status(201).json(newBlog)

};

//Update Blog

const updateBlog = async (req, res, next) => {
    const {title, description, category, author, content} = req.body;
    const {id} = req.params;

    const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, description, category, author, content }, 
        {new: true, runValidators: true}
    );

    if(!updatedBlog) {
        res.status(404);
        throw new Error('Blog not Found');
        return;
    }

    res.status(200).json(updatedBlog);
};

//Delete Blog
    const deleteBlog = async (req, res, next) => {
        const {id} = req.params;

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if(!deletedBlog) {
            res.status(404);
            throw new Error('Blog does not Exist to Delete');
            return;
        }

        res.status(200).json({Message: 'Blog Deleted Successfully ', deletedBlog});
    };

export {
    getBlogs,
    userBlogs,
    getBlogBySearch,
    getBlog,
    postBlog,
    updateBlog,
    deleteBlog
};
