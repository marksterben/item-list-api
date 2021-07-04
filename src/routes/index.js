const {
  getItems,
  addItem,
  updateItem,
  removeItem,
} = require("../controllers/items");

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.get("/api/items", getItems);

router.post("/api/item", jsonParser, addItem);

router.put("/api/item/:id", jsonParser, updateItem);

router.delete("/api/item/:id", removeItem);

module.exports = router;
