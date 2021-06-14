const mongoose = require("./DBconnect");
const { Schema } = mongoose;
require("dotenv").config();

const PostSchema = new Schema({
  title: String,
  content: String,
  private: Boolean,
  likes: Number,
  createdAt: Date,
  Author: String,
  tags: Array,
});

module.exports = mongoose.model("Post", PostSchema);
