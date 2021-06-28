const express = require("express");
const { validateToken } = require("../Middlewares");
const rating = express.Router();
const getRaters = require("../services/GetRaters");
const ratePost = require("../services/RatePost");
const getAvgRate = require("../services/GetAvgRate");

rating.get("/isRated", validateToken, async (req, res) => {
  const { id, userName } = req.query;
  const data = await getRaters(id, userName);
  res.send(data);
});

rating.post("/ratePost", validateToken, async (req, res) => {
  const { postId, userName, rate } = req.body;
  const AVG = await ratePost(postId, userName, rate);
  res.status(200).send({ AVG });
});

rating.get("/getRate", async (req, res) => {
  const { id } = req.query;
  const AVG = await getAvgRate(id);
  res.json({ AVG });
});

module.exports = rating;
