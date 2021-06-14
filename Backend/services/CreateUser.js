const User = require("../models/User");

function createUser(user) {
  try {
    console.log(user);
    const newUser = new User(user);
    newUser.save();
    return "User created successfully";
  } catch (error) {
    return error;
  }
}

module.exports = createUser;
