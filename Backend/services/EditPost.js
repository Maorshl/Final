const Post = require("../models/Post");

async function editPost(req, res) {
  const { id, title, description, tags } = req.body;
  Post.findByIdAndUpdate(id, { title, description, tags }).then(result => {
    console.log(result);
    res.send("Updated");
  });
}

module.exports = editPost;
