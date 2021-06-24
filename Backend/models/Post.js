const mongoose = require("./DBconnect");
const { Schema } = mongoose;
require("dotenv").config();

const PostSchema = new Schema({
  title: String,
  url: String,
  head: String,
  description: String,
  private: Boolean,
  createdAt: Date,
  author: String,
  tags: Array,
  rating: Number,
  raters: Array,
  rateAVG: Number,
});

module.exports = mongoose.model("Post", PostSchema);
