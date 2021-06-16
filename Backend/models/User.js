const mongoose = require("./DBconnect");
const { Schema } = mongoose;
require("dotenv").config();

const userSchema = new Schema({
  userName: { type: String, unique: true, required: true, dropDups: true },
  email: { type: String, unique: true, required: true },
  password: String,
  privatePosts: Array,
  savedPosts: Array,
  timeUsing: Number,
});

module.exports = mongoose.model("User", userSchema);
