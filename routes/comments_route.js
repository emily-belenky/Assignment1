const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment_controller");

router.post("/:id", commentController.createComment);

router.get("/", commentController.getAllComments);

router.get("/:id", commentController.getCommentById);

router.put("/:id", commentController.updateComment);

router.delete("/:id", commentController.deleteComment);

module.exports = router;