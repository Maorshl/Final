const Post = require("../models/Post");

//* This function receive post id and return his AVG rate.

async function getAvgRate(req, res) {
  const { id } = req.query;
  const post = await Post.findById(id);
  const AVG = post.rateAVG;
  res.send({ AVG });
}

module.exports = getAvgRate;
