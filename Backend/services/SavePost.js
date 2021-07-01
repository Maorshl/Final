const Post = require("../models/Post");

async function likePost(req, res) {
  const { userName, postId } = req.body;
  try {
    await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { likes: userName } }
    );
    res.send("updated successfully");
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = likePost;
