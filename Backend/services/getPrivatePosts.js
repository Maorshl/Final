const Post = require("../models/Post");

function getPrivatePosts(req, res) {
  const { user } = req.params;
  Post.find({ author: user, private: true }).then((result) => {
    res.json(result);
  });
}
module.exports = getPrivatePosts;
