const Post = require("../models/Post");
const getTitle = require("./GetTitle");

async function createPost(post) {
  try {
    const newPost = new Post(post);
    newPost.head = await getTitle(newPost.url);
    newPost.save();
    return "Post created successfully";
  } catch (error) {
    return error;
  }
}

module.exports = createPost;
