const mongoose = require("./DBconnect");
const { Schema } = mongoose;
require("dotenv").config();

const userSchema = new Schema({
  name: { first: String, last: String },
  privatePosts: Array,
  savedPosts: Array,
  timeUsing: Number,
});

module.exports = mongoose.model("User", userSchema);
