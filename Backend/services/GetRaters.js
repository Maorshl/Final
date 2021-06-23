const Post = require("../models/Post");
//* This function recive post id and user name, and return true/false if the user rated the post.

async function getRaters(id, userName) {
  const post = await Post.findById(id);
  const { raters } = post;
  const checkUser = raters.find(rater => rater === userName);
  if (checkUser) return true;
  return false;
}

module.exports = getRaters;
