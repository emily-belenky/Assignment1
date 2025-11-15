const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts_controller");

// create new post
router.post("/", postsController.createPost);

// get all posts
router.get("/", postsController.getAllPosts);

// get post by id
router.get("/:id", postsController.getPostById);

// update post
router.put("/:id", postsController.updatePost);

module.exports = router;
