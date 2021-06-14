const express = require("express");
const cors = require("cors");
const user = require("./api-routes/user");
const post = require("./api-routes/post");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", user);
app.use("/post", post);

app.listen(PORT, () => {
  console.log(`listening on post ${PORT}`);
});

module.exports = app;
