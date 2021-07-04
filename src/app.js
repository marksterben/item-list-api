require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

const { MONGODB_ATLAS_USERNAME, MONGODB_ATLAS_PASSWORD, MONGODB_ATLAS_DBNAME } =
  process.env;

const uri = `mongodb://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@cluster0-shard-00-00.eulqx.mongodb.net:27017,cluster0-shard-00-01.eulqx.mongodb.net:27017,cluster0-shard-00-02.eulqx.mongodb.net:27017/${MONGODB_ATLAS_DBNAME}?ssl=true&replicaSet=atlas-dptj59-shard-0&authSource=admin&retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(cors());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

mongoose.set("useFindAndModify", true);
mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(PORT, () => {
      console.info(`Example app listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    throw error;
  });
