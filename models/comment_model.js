const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post", // reference to the Post model from the post_model.js file
        required: true
    },
    sender: {
        type: String,
        required: true,
        trim: true // remove whitespace from the beginning and end of the string for example "   Dotan   " -> "Dotan"
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
    }, 
    {
        timestamps: true
    });

module.exports = model("Comment", commentSchema);