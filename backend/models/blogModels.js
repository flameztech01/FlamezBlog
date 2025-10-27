import mongoose, { mongo } from 'mongoose';
import express from 'express';

const blogSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {type: String, required: true},
    description: {type: String, required: true},
    author: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, require: true},
    content: {type: String, required: true},
    date: {type: Date, default: Date.now}
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;