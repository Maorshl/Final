const Post = require("../models/Post");

async function getAvgRate(id) {
  const post = await Post.findById(id);
  return post.rateAVG;
}

module.exports = getAvgRate;
