const express = require("express");
const getRaters = require("../services/GetRaters");
const rating = express.Router();

rating.get("/", async (req, res) => {
  const { id, userName } = req.query;
  const data = await getRaters(id, userName);
  res.send(data);
});

module.exports = rating;
