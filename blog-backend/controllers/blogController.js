const Blog = require("../models/Blog");

// Create Blog
const createBlog = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;
    const blog = await Blog.create({ title, content, author });
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    next(error);
  }
};

// Get All Blogs
const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ message: "All blogs fetched successfully", blogs });
  } catch (error) {
    next(error);
  }
};

// Get Single Blog by ID
const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    res.status(200).json({ message: "Blog fetched successfully", blog });
  } catch (error) {
    next(error);
  }
};

// Update Blog
const updateBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    next(error);
  }
};

// Delete Blog
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
