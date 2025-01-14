const User = require("../models/User");
const { hashPassword } = require("../utils/hash.utils");

const findUser = async (email) => {
  const userData = await User.findOne({ email });
  return userData;
}
const registerUser = async (user) => {
  const { email, password, firstName, lastName, phoneNumber, role } = user;
  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    phoneNumber,
    role
  });

  await newUser.save();
  return newUser;
};

module.exports = {
  registerUser,
  findUser



}