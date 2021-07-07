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
const getOnePostById = require("../services/GetOnePostById");

post.post("/create", validateToken, (req, res) => {
  try {
    createPost(req.body);
    res.send("post created successfully");
  } catch (error) {
    res.send(error.message).status(500);
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

post.get("/SavedPosts", validateToken, (req, res) => {
  try {
    getSavedPosts(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

post.get("/postByTag", validateToken, (req, res) => {
  try {
    getPostsByTag(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});
post.get("/getOnePostById", (req, res) => {
  try {
    getOnePostById(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});
post.get("/followers/:tag", (req, res) => {
  try {
    getTagFollowers(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

post.post("/follow", (req, res) => {
  try {
    followTag(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});
post.patch("/unFollow", (req, res) => {
  try {
    unFollowTag(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});
module.exports = post;
