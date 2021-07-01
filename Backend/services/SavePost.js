const User = require("../models/User");

async function likePost(req, res) {
  const { userName, postId } = req.body;
  try {
    await User.findOneAndUpdate(
      { userName: userName },
      { $push: { savedPosts: postId } }
    );
    res.send("updated successfully");
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = likePost;
