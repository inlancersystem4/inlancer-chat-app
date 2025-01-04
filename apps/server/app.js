const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const { successLog, errorLog } = require("./utils/logger");
const { port } = require("./config");
const sequelize = require("./config/database");

const app = express();

const upload = multer();
app.use(upload.none());

app.use(bodyParser.json());
app.use(cors());

sequelize
  .authenticate()
  .then(() => {
    successLog.info("Connection to MySQL has been established successfully.");
  })
  .catch((err) => {
    errorLog.error(err);
  });

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  successLog.info(`Server started on port ${port}`);
});
