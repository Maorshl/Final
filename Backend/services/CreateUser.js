const User = require("../models/User");

async function createUser(user) {
  try {
    const newUser = new User(user);
    newUser.save();
    return "User created successfully";
  } catch (error) {
    return error;
  }
}

module.exports = createUser;
