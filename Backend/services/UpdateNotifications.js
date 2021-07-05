const User = require("../models/User");

//* This function receive user name and change all of his notifications.read => true

async function updateNotifications(req, res) {
  const { userName } = req.query;
  User.updateOne(
    { userName, "notifications.read": false },
    { $set: { "notifications.$[].read": true } }
  ).then(result => {
    return res.send("Updated");
  });
}

module.exports = updateNotifications;
