const express = require("express");
const user = express.Router();
const createUser = require("../services/CreateUser");

user.post("/create", (req, res) => {
  try {
    createUser(req.body);
    res.send("User created successfully");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = user;
