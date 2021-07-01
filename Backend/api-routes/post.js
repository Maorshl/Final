const express = require("express");
const post = express.Router();
const { validateToken } = require("../Middlewares");
const createPost = require("../services/CreatePost");
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

post.get("/getPosts", async (req, res) => {
  //* With the query the server will know which data send to each client
  //* If the user search for somthing, it will add to the function
  const { pageNum, latestPost, searchFilter, searchText } = req.query;
  const data = await getPosts(pageNum, latestPost, searchFilter, searchText);
  res.send(data);
});

module.exports = post;
