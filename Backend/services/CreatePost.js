const Post = require("../models/Post");
const getTitle = require("./GetTitle");

async function createPost(post) {
  try {
    const newPost = new Post(post);
    // postCreated(newPost.tags);
    // sendNofitication(newPost.author,newPost.tags);
    newPost.head = await getTitle(newPost.url);
    newPost.save();
    return "Post created successfully";
  } catch (error) {
    return error;
  }
}

module.exports = createPost;
