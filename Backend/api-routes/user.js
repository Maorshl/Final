const express = require("express");
const user = express.Router();
const getNewToken = require("../services/RefreshToken");
const createUser = require("../services/CreateUser");
const login = require("../services/Login");

user.post("/create", (req, res) => {
  try {
    createUser(req.body);
    res.send("User created successfully");
  } catch (error) {
    res.send(error.message);
  }
});

user.get("/login", async (req, res) => {
  await login(req, res);
});

user.get("/refreshToken", (req, res) => {
  try {
    getNewToken(req, res);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = user;
