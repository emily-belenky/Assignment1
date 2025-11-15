const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment_controller");

router.post("/:id", commentController.createComment);

router.get("/", commentController.getAllComments);

router.get("/:id", commentController.getCommentById);

module.exports = router;