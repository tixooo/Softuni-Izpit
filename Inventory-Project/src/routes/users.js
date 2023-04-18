const express = require("express"),
  { User } = require("../models/User");

const router = express.Router();

router.post("/signUp", async (req, res) => {
  try {
    if (await User.findOne({ username: req.body.username }))
      return res
        .status(400)
        .json({ error: "A user with this username already exists." });

    const user = await User.create(req.body);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const user = await User.findOne({
      password: req.body.password,
      username: req.body.username,
    });
    if (!user) return res.status(400).json({ error: "No such user." });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
