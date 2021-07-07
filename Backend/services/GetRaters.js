const Post = require("../models/Post");

//* This function receive post id and user name, and return true/false if the user rated the post.

async function getRaters(req, res) {
  const { id, userName } = req.query;
  const post = await Post.findById(id);
  const { raters } = post;
  const checkUser = raters.find(rater => rater === userName);
  if (checkUser) return res.send(true);
  return res.send(false);
}

module.exports = getRaters;
