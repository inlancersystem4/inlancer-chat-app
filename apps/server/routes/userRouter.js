const express = require("express");
const { allUser } = require("../controllers/userControllers");
const router = express.Router();

router.post("/users", allUser);

module.exports = router;
