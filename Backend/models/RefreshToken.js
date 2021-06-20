const mongoose = require("./DBconnect");
const { Schema } = mongoose;
require("dotenv").config();

const RefreshTokenSchema = new Schema({
  // createdAt: { type: Date, expires: 30, default: Date.now },
  token: String,
});

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
