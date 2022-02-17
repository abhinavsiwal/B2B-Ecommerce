const express = require("express");
const router = express.Router();

const {getTotal} = require("../controllers/stats-controller");

router.get("/total",getTotal);

module.exports = router;