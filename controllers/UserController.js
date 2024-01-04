const User = require("../models/UserSchema"); // Assuming your User model is in a 'models' directory

const createUser = async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      type: "user",
      loans: [],
    });

    if (user) {
      res.status(201).json({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        type: user.type,
        loans: user.loans,
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the User");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: { $regex: new RegExp("^" + email + "$", "i") },
    }).populate("loans");
    if (user && user.password === password) {
      res.json({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        type: user.type,
        loans: [...user.loans],
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createUser, authUser };
