const Post = require("../models/Post");

function createPost(post) {
  try {
    const newPost = new Post(post);
    newPost.save();
    return "Post created successfully";
  } catch (error) {
    return error;
  }
}

module.exports = createPost;
