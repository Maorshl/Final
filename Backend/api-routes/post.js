const express = require("express");
const post = express.Router();
const { validateToken } = require("../Middlewares");
const createPost = require("../services/CreatePost");
const getPrivatePosts = require("../services/getPrivatePosts");
const getPosts = require("../services/GetPosts");
const getSavedPosts = require("../services/GetSavedPosts");
const getPostsByTag = require("../services/GetPostsByTag");
const followTag = require("../services/FollowTag");
const getTagFollowers = require("../services/GetTagFollowers");
const unFollowTag = require("../services/unFollowTag");

post.post("/create", validateToken, (req, res) => {
  try {
    createPost(req.body);
    res.send("post created successfully");
  } catch (error) {
    res.send(error.message);
  }
});

post.get("/private", validateToken, (req, res) => {
  try {
    getPrivatePosts(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

post.get("/getPosts", validateToken, (req, res) => {
  try {
    getPosts(req, res);
  } catch (error) {
    console.log(error);
  }
});

post.get("/SavedPosts", validateToken, async (req, res) => {
  try {
    await getSavedPosts(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

post.get("/:tag", validateToken, async (req, res) => {
  try {
    await getPostsByTag(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});
post.get("/followers/:tag", async (req, res) => {
  try {
    await getTagFollowers(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

post.post("/follow", async (req, res) => {
  try {
    followTag(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});
post.post("/unFollow", async (req, res) => {
  try {
    unFollowTag(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});
module.exports = post;
