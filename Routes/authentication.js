const express = require("express");
const { login } = require("./../Controllers/authentication");

const router = express.Router();

router.route("/login").post(login);
module.exports = router;
