const Post = require("../models/Post");

function getPrivatePosts(req, res) {
  const { user } = req.params;
  Post.find({ author: user, private: true })
    .sort({ createdAt: "desc" })
    .limit(50)
    .then(result => {
      res.json(result);
    });
}
module.exports = getPrivatePosts;
