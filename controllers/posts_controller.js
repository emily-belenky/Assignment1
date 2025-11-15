const Post = require("../models/post_model");

// create a new post
async function createPost(req, res) {
  try {
    const { sender, message } = req.body;

    if (!sender || !message) {
      return res.status(400).json({ error: "sender and message are required" });
    }

    const newPost = new Post({ sender, message });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    console.error("createPost error:", err);
    res.status(500).json({ error: "server error" });
  }
}

// get all posts or filter by sender
async function getAllPosts(req, res) {
  try {
    const query = {};

    if (req.query.sender) {
      query.sender = req.query.sender;
    }

    const posts = await Post.find(query);
    res.json(posts);
  } catch (err) {
    console.error("getAllPosts error:", err);
    res.status(500).json({ error: "server error" });
  }
}

// get one post by id
async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error("getPostById error:", err);
    res.status(500).json({ error: "server error" });
  }
}

// update post by id
async function updatePost(req, res) {
  try {
    const { sender, message } = req.body;

    if (!sender || !message) {
      return res.status(400).json({ error: "sender and message are required" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { sender, message },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "post not found" });
    }

    res.json(updatedPost);
  } catch (err) {
    console.error("updatePost error:", err);
    res.status(500).json({ error: "server error" });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost
};
