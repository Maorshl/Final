const Post = require("../models/Post");

async function GetOnePostById(req, res) {
  try {
    const { id } = req.query;
    const post = await Post.findById(id);
    res.send(post);
  } catch (error) {
    return error;
  }
}

module.exports = GetOnePostById;
