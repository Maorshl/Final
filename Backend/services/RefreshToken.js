require("dotenv").config();
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateToken } = require("../Middlewares");
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;
const user = require("../models/User");
const refreshToken = require("../models/RefreshToken");

async function getNewToken(req, res) {
  const { refToken } = req.body;
  if (!refToken) {
    return res.status(400).send("Refresh token needed");
  }
  const checkToken = await refreshToken.findOne({ token: refToken });
  if (!checkToken) {
    return res.status(403).send("Invalid refresh token");
  }
  jwt.verify(refToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid Refresh Token");
    }
    const accessToken = jwt.sign(decoded, ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });
    res.json({ accessToken });
  });
}

module.exports = getNewToken;
