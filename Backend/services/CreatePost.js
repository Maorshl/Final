const Post = require("../models/Post");
const getTitle = require("./GetTitle");
const postCreated = require("./PostCreated");

async function createPost(post) {
  try {
    const newPost = new Post(post);
    newPost.head = await getTitle(newPost.url);
    newPost.save().then(result => {
      postCreated(result);
    });
    return "Post created successfully";
  } catch (error) {
    return error;
  }
}

module.exports = createPost;
