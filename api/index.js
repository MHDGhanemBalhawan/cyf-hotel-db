const express = require("express");
const router = express.Router();

const class3 = require("./class3");
router.use("/", class3);

module.exports = router;
