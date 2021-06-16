const mongoose = require("./DBconnect");
const { Schema } = mongoose;
require("dotenv").config();

const PostSchema = new Schema({
  title: String,
  url: String,
  content: String,
  private: Boolean,
  createdAt: Date,
  author: String,
  tags: Array,
  rating: Number,
});

module.exports = mongoose.model("Post", PostSchema);
