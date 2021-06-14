const Post = require("../models/Post");

async function getAllPosts() {
  try {
    return await Post.find({});
  } catch (error) {
    return error;
  }
}

module.exports = getAllPosts;
