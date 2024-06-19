import mongoose from 'mongoose';
import User from './userModel.js';

const blogsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    content: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

const Blog = new mongoose.model("Blog", blogsSchema)

export default Blog;