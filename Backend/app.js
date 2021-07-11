const express = require("express");
const cors = require("cors");
const user = require("./api-routes/user");
const post = require("./api-routes/post");
const rating = require("./api-routes/rating");
const path = require("path");

require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));

app.use("/user", user);
app.use("/post", post);
app.use("/rating", rating);
app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
