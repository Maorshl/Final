const Post = require("../models/Post");

async function getPostsByTag(req, res) {
  const { tag } = req.params;

  const postsByTags = await Post.find({
    tags: { $in: [tag] },
  })
    .sort({ createdAt: "desc" })
    .limit(50);
  res.send(postsByTags);
}

module.exports = getPostsByTag;
