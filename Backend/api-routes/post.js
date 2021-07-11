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
const unFollowTag = require("../services/UnfollowTag");
const getOnePostById = require("../services/GetOnePostById");
const editPost = require("../services/EditPost");

post.post("/create", validateToken, (req, res) => {
  try {
    createPost(req, res);
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
post.get("/getOnePostById", validateToken, (req, res) => {
  try {
    getOnePostById(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});
post.get("/followers/:tag", validateToken, (req, res) => {
  try {
    getTagFollowers(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

post.post("/follow", validateToken, (req, res) => {
  try {
    followTag(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});
post.patch("/unFollow", validateToken, (req, res) => {
  try {
    unFollowTag(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

post.patch("/edit", (req, res) => {
  try {
    editPost(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

module.exports = post;
