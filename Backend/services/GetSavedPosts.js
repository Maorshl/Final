const Post = require("../models/Post");
const User = require("../models/User");

async function GetSavedPosts(req, res) {
  const { userName } = req.body;
  const { savedPosts } = await User.findOne({ userName });
  const usersSavedPosts = await Post.find({ _id: { $in: [...savedPosts] } });
  res.send(usersSavedPosts);
}

module.exports = GetSavedPosts;
