const express = require("express");
const { validateToken } = require("../Middlewares");
const rating = express.Router();
const getRaters = require("../services/GetRaters");
const ratePost = require("../services/RatePost");
const getAvgRate = require("../services/GetAvgRate");

rating.get("/isRated", validateToken, (req, res) => {
  try {
    getRaters(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

rating.post("/ratePost", validateToken, async (req, res) => {
  try {
    ratePost(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

rating.get("/getRate", async (req, res) => {
  try {
    getAvgRate(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

module.exports = rating;
