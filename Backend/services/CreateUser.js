const User = require("../models/User");
const { hashSync } = require("bcrypt");

function createUser(user) {
  try {
    const hashedPassword = hashSync(user.password, 10);
    user.password = hashedPassword;
    const newUser = new User(user);
    newUser.save();
    return "User created successfully";
  } catch (error) {
    return error;
  }
}

module.exports = createUser;
