const users = require("express").Router();
const { encryptPassword, decryptPassword } = require("../middleware/bcrypt");
const UserModel = require("../models/UserModel");

const checkThatUserAlreadyExists = (user) => {};

users.get("/", async (req, res, next) => {
  const response = await UserModel.find().exec();
  res.send(response);
});

users.post("/register", async (req, res, next) => {
  const { email, password } = req.body.user;
  const isUserAlreadyRegistered = await UserModel.find({ email: email });
  if (isUserAlreadyRegistered.length > 0) {
    return res
      .status(409)
      .send(`User with email ${email} is already registered`);
  }
  const hashedPassword = await encryptPassword(password);
  const newUser = new UserModel({
    email,
    password: hashedPassword,
  });
  try {
    const savedUser = await newUser.save();
    res.send("You have been registered!");
  } catch (err) {
    res.status(500).send(err);
  }
});

users.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body.user;
    const userInDatabase = await UserModel.find({ email: email }).exec();

    if (userInDatabase.length === 0) {
      return res.send("User doesn't exist in database.");
    }

    const isPasswordValid = await decryptPassword(
      password,
      userInDatabase[0].password
    );

    res.send(isPasswordValid);
  } catch (err) {
    res.status(500).send("Can't login user, due the internal error.");
  }
});

module.exports = users;