const { Schema, model } = require("../db/connect");
const { InventorySchema } = require("./Inventory");

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  token: { type: String, unique: true },
  data: {
    inventories: [{ type: InventorySchema, required: false }],
  },
});

const User = model("User", UserSchema);
module.exports = { User, UserSchema };
