import Blog from "../models/blogsModel.js";
// import User from "../models/userModel.js";


const getAllBlogs = async (req, res) => {

    try {
        const blogs = await Blog.find({});
        res.status(200).json(blogs);
    } catch (error) {
        res.status(404);
        throw new Error("Resource not found");
    }

}

const getUserBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user._id });
        res.status(200).json(blogs)
    }
    catch (err) {
        res.status(400).json({ message: ' unsuccessful' })
    }
}


const getBlogData = async (req, res) => {
    const blogId = req.params.id;
    const blogData = await Blog.findById(blogId);
    if (blogData) {
        res.status(200).json(blogData);
    } else {
        res.status(404).json({ message: "resource not found" })
    }
}

const createABlog = async (req, res) => {
    const { title, content, author, image, description } = req.body;

    if (!author) {
        author = req.user.name;
    }

    const blog = new Blog({
        title,
        user: req.user._id,
        author,
        content,
        image,
        description,
    })

    const createdBlog = await blog.save();

    res.status(201).json(createdBlog);
}

export { getAllBlogs, getBlogData, createABlog, getUserBlogs };