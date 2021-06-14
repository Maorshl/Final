const Post = require("../models/Post");

function createPost(post) {
  try {
    console.log(post);
    const newPost = new Post(post);
    newPost.save();
    return "Post created successfully";
  } catch (error) {
    return error;
  }
}

module.exports = createPost;
