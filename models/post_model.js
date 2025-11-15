const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Post", postSchema);
