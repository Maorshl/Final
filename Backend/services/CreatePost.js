const Post = require("../models/Post");
const getTitle = require("./GetTitle");
const postCreated = require("./PostCreated");

//* This function receive post, and set is header with get title function, if there is no title from the customer it set the title tag as the post.title

async function createPost(req, res) {
  const post = req.body;
  const newPost = new Post(post);
  if (!newPost.title) {
    newPost.title = await getTitle(newPost.url);
  } else {
    newPost.head = await getTitle(newPost.url);
  }
  newPost.save().then(result => {
    if (!newPost.private) {
      postCreated(result);
    }
  });
  res.send("Post created successfully");
}

module.exports = createPost;
