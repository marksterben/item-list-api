const { model, Schema } = require("mongoose");

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Item = model("Item", itemSchema);

module.exports = Item;
