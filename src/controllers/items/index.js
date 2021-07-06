const ItemModel = require("../../models/item");

exports.getItems = async (req, res) => {
  const items = await ItemModel.find();

  res.status(200).json({ items });
};

exports.addItem = async (req, res) => {
  const { name, count } = req.body;

  // If all or one of the required body is undefined
  if (!name || !count) {
    res.status(400).json({
      errorMessage: "name and count is required",
    });

    return;
  }

  const newItemModel = new ItemModel({
    name: name,
    count: count,
  });

  const newItem = await newItemModel.save();

  res.status(201).json({
    message: "Item successfully added!",
    created: newItem,
  });
};

exports.updateItem = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  if (!body.name || !body.count) {
    res.status(400).json({
      errorMessage: "name and count is required",
    });

    return;
  }

  const updatedItem = await ItemModel.findOneAndUpdate({ _id: id }, body);

  if (!updatedItem) {
    res.status(400).json({
      errorMessage: "Edit item failed. Not implemented",
    });

    return;
  }

  res.status(200).json({
    message: "Item successfully edited",
  });
};

exports.removeItem = async (req, res) => {
  const id = req.params.id;

  const removedItem = await ItemModel.findOneAndDelete({ _id: id });

  if (!removedItem) {
    res.status(400).json({
      errorMessage: "Remove item failed. Not implemented",
    });

    return;
  }

  res.status(200).json({
    message: "item successfully removed",
  });
};

exports.removeAllItem = async (req, res) => {
  const removedItem = await ItemModel.deleteMany({});

  if (!removedItem) {
    res.status(400).json({
      errorMessage: "Remove items failed. Not implemented",
    });

    return;
  }

  res.status(200).json({
    message: "items successfully removed",
  });
};
