const mongoose = require("./DBconnect");
const { Schema } = mongoose;
require("dotenv").config();

const tagSchema = new Schema({
  name: String,
  followers: Array,
});

module.exports = mongoose.model("Tag", tagSchema);
