require("dotenv").config();
const { Router } = require("express");
const { Inventory } = require("../models/Inventory");
const { User } = require("../models/User");

const router = Router();

router.post("/createInventory", async (req, res) => {
  try {
    const inventory = await Inventory.create(req.body.inventory),
      from = await User.findOne({ username: req.body.from }).exec();

    // add checks if inventory already exists in this users inventories...
    from.data.inventories.push(inventory);
    from.markModified("data");
    await from.save();

    res.status(200).json({ userData: from.data });
  } catch (error) {
    res.send(400).json({ error });
  }
});

router.post("/addItems", async (req, res) => {
  try {
    const inventoryName = req.body.inventoryName,
      from = await User.findOne({ username: req.body.from }),
      items = req.body.inventoryItems;

    const inventory = from.data.inventories.find(
      (inventory) => inventory.name === inventoryName
    );
    inventory.items = [...inventory.items, ...items];
    from.markModified("data");
    await from.save();

    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/deleteItem", async (req, res) => {
  try {
    const inventoryName = req.body.inventoryName,
      from = await User.findOne({ username: req.body.from }),
      item = req.body.inventoryItem;

    const inventory = from.data.inventories.find(
      (i) => i.name === inventoryName
    );
    inventory.items.splice(
      inventory.items.findIndex(
        (i) => i.name === item.name && i.quantity === item.quantity
      ),
      1
    );
    from.markModified("data");
    await from.save();

    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/editItem", async (req, res) => {
  try {
    const item = req.body.item,
      replacement = req.body.itemReplacement,
      inventory = req.body.inventory,
      from = await User.findOne({ username: req.body.from });

    const inventoryIndex = from.data.inventories.findIndex(
      (i) => i.name === inventory
    );
    if (inventoryIndex === -1)
      return res.status(400).json({ error: "You do not have such inventory." });

    const itemIndex = from.data.inventories[inventoryIndex].items.findIndex(
      (i) => i.name === item.name && i.quantity === item.quantity
    );
    if (itemIndex === -1)
      return res
        .status(400)
        .json({ error: "You do not have such an item in this inventory." });

    from.data.inventories[inventoryIndex].items[itemIndex] = replacement;
    await from.save();

    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/deleteInventory", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.from }),
      inventory = req.body.inventoryName;

    const inventoryIndex = user.data.inventories.findIndex(
      (i) => i.name === inventory
    );
    user.data.inventories.splice(inventoryIndex, 1);

    user.markModified("data");
    await user.save();

    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
