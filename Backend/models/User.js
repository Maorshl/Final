const mongoose = require("./DBconnect");
const { Schema } = mongoose;
require("dotenv").config();

const userSchema = new Schema({
  userName: String,
  password: String,
  privatePosts: Array,
  savedPosts: Array,
  timeUsing: Number,
});

module.exports = mongoose.model("User", userSchema);
