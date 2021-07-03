const Post = require("../models/Post");
const User = require("../models/User");

async function GetSavedPosts(req, res) {
  const { userName } = req.body;
  const usersSavedPosts = await Post.find({ likes: { $in: [userName] } });
  res.send(usersSavedPosts);
}

module.exports = GetSavedPosts;
