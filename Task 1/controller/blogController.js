// controllers/blogController.js
const Blog = require('../models/blog');
const mongoose = require('mongoose');

// Get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
    const { id } = req.params;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid blog ID format' });
    }

    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Post a new blog
exports.postBlog = async (req, res) => {
    // here creating a new instance of the Blog Model where data re requested from the body
    const blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
    });

    try {
        // saving new blog to the DB 
        const newBlog = await blog.save();
        // If successful respond with new created blog
        res.status(201).json(newBlog);
        console.log("Saved")
    } catch (err) {
        // if error seen respond with satus code
        res.status(400).json({ message: err.message });
    }
};

// Update a blog
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        if (req.body.title != null) {
            blog.title = req.body.title;
        }
        if (req.body.description != null) {
            blog.description = req.body.description;
        }
        if (req.body.category != null) {
            blog.category = req.body.category;
        }

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
