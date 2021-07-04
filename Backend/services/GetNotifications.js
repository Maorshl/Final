const User = require("../models/User");

async function getUserNotifications(req, res) {
  const { userName } = req.query;
  const user = await User.findOne({ userName }).exec();
  console.log(user);
  res.send(user.notifications);
}

module.exports = getUserNotifications;
