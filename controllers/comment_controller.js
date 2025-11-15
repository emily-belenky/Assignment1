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

module.exports = {
    createComment
}