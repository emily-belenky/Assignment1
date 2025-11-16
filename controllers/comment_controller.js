const Comment = require('../models/comment_model');

const createComment = async (req, res) => {
    try {
    const id = req.params.id;
    const { sender, message } = req.body;

    if (!sender || !message) {
        return res.status(400).json({ error: "sender and message are required" }); // 400: Bad Request
    }

    const newComment = new Comment({ postId: id, sender, message });
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
    } catch (err) {
        console.error("createComment error:", err);
        res.status(500).json({ error: "server error" });
    }
}

const getAllComments = async (req, res) => { // optional by a specific post id
    try {
        const filter = {};
    
        if (req.query.postId) {
          filter.postId = req.query.postId;
        }
    
        const comments = await Comment.find(filter);
        res.json(comments);
      } catch (err) {
        console.error("getAllComments error:", err);
        res.status(500).json({ error: "server error" });
      }
}

const getCommentById = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({error: "comment not found"})
        }
        res.json(comment);

    } catch (err) {
        console.error("getCommentById error:", err);
        res.status(500).json({ error: "server error" });
    }
}

const updateComment = async (req, res) => {
    try {
        const id = req.params.id;
        const { sender, message } = req.body;

        if (!sender || !message) {
            return res.status(400).json({ error: "sender and message are required" });
        }

        const updatedComment = await Comment.findByIdAndUpdate(id, { sender, message }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ error: "comment not found" });
        }
        res.json(updatedComment);
    } catch (err) {
        console.error("updateComment error:", err);
        res.status(500).json({ error: "server error" });
    }
}

const deleteComment = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ error: "comment not found" });
        }
        res.json({ message: "comment deleted successfully" });
    } catch (err) {
        console.error("deleteComment error:", err);
        res.status(500).json({ error: "server error" });
    }
}
module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment
}