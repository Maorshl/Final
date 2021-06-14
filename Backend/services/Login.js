require("dotenv").config();
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateToken } = require("../Middlewares");
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;
const user = require("../models/User");
const refreshToken = require("../models/RefreshToken");

const login = async (req, res) => {
  const { name, password } = req.body;

  const loginUser = await user.findOne({ userName: name });
  if (!loginUser) {
    return res.status(403).send("User or password incorrect");
  }
  const checkPass = await compare(password, loginUser.password);
  if (!checkPass) {
    return res.status(403).send("User or password incorrect");
  }
  const accessToken = jwt.sign(loginUser, ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
  const newRefreshToken = jwt.sign(loginUser, REFRESH_TOKEN_SECRET);
  new refreshToken({ token: newRefreshToken }).save();
  res.json({ name, accessToken, newRefreshToken });
};
