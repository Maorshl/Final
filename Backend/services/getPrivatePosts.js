const Post = require("../models/Post");

function getPrivatePosts(req, res) {
  let { searchFilter, searchText, userName } = req.query;

  const text = new RegExp(searchText, "i");
  searchFilter ? searchFilter : (searchFilter = "title");

  Post.find({ author: userName, $and: [{ [searchFilter]: text }] })
    .sort({ createdAt: "desc" })
    .limit(50)
    .then(result => {
      res.json(result);
    });
}
module.exports = getPrivatePosts;
