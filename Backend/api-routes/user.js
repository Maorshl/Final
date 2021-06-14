const express = require("express");
const user = express.Router();
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

user.get("/login", (req, res) => {
  try {
  } catch (error) {}
});

module.exports = user;
