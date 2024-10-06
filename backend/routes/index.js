const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/accounts", require("./account"));
router.use("/categories", require("./category"));
router.use("/operations", require("./operation"));

module.exports = router;
