const express = require("express");
const user = express.Router();
const getNewToken = require("../services/RefreshToken");
const Logout = require("../services/Logout");
const createUser = require("../services/CreateUser");
const login = require("../services/Login");
const savePost = require("../services/SavePost");
const { validateToken } = require("../Middlewares");

user.post("/create", async (req, res) => {
  await createUser(req, res);
});

user.post("/login", async (req, res) => {
  await login(req, res);
});

user.post("/refreshToken", (req, res) => {
  try {
    getNewToken(req, res);
  } catch (error) {
    res.send(error.message);
  }
});

user.post("/logout", async (req, res) => {
  try {
    await Logout(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

user.post("/save", validateToken, async (req, res) => {
  try {
    await savePost(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});
module.exports = user;
