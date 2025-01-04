const express = require("express");
const { signUp } = require("../controllers/authControllers");
const router = express.Router();

router.post("/sign-up", signUp);

module.exports = router;
