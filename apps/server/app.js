const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const { successLog } = require("./utils/logger");
const { port } = require("./config");
const { syncDatabase } = require("./config/database");

const app = express();

const upload = multer();
app.use(upload.none());

app.use(bodyParser.json());
app.use(cors());

syncDatabase();

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  successLog.info(`Server started on port ${port}`);
});
