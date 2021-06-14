const express = require("express");
const cors = require("cors");
const createUser = require("./services/CreateUser");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`listening on post ${PORT}`);
});

app.get("/", (req, res) => {
  const created = createUser(req.body);
  res.send(created);
});

module.exports = app;
