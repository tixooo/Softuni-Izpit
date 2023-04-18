const { User } = require("../models/User");
const { Router } = require("express");

const router = Router();

router.post("/deleteUser", async (req, res) => {
  try {
    await User.deleteOne({ username: req.body.user });

    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/deleteInventory", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.user }),
      inventory = req.body.inventory;

    if (!user) return res.status(400).json({ error: "No such user." });

    user.data.inventories.splice(
      user.data.inventories.findIndex((i) => i.name === inventory),
      1
    );
    user.markModified("data");
    await user.save();

    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).exec();

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
