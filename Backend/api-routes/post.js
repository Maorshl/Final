const express = require("express");
const post = express.Router();
const { validateToken } = require("../Middlewares");
const createPost = require("../services/CreatePost");
const getAllPosts = require("../services/GetAllPosts");
// resolved conflict
const getPrivatePosts = require("../services/getPrivatePosts");

const getPosts = require("../services/GetPosts");


post.post("/create", validateToken, (req, res) => {
  try {
    createPost(req.body);
    res.send("post created successfully");
  } catch (error) {
    res.send(error.message);
  }
});

post.get("/:user/private", validateToken, (req, res) => {
  try {
    getPrivatePosts(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

post.get("/", validateToken, async (req, res) => {
  const posts = await getAllPosts();
  res.json(posts);
});

post.get("/getFew", validateToken, async (req, res) => {
  let { pageNum } = req.query;
  const data = await getPosts(pageNum);

  res.send(data);
});
module.exports = post;
