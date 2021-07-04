const Post = require("../models/Post");

async function getPostsByTag(req, res) {
  const { tag } = req.params;
  let { searchFilter, searchText } = req.query;

  const text = new RegExp(searchText, "i");
  searchFilter ? searchFilter : (searchFilter = "title");

  const postsByTags = await Post.find({
    tags: { $in: [tag] },
    $and: [{ [searchFilter]: text }, { private: false }],
  })
    .sort({ createdAt: "desc" })
    .limit(50);
  res.send(postsByTags);
}

module.exports = getPostsByTag;
