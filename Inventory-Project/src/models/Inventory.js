const { Schema, model } = require("mongoose");

const InventorySchema = new Schema({
  name: { type: String, requried: true },
  items: [
    new Schema({
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    }),
  ],
});

const Inventory = model("Inventory", InventorySchema);
module.exports = { Inventory, InventorySchema };
