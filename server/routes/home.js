const express = require("express");
const router = express.Router();

const sqlhelper = require("../utils/sqlhelper.js");
const sql = new sqlhelper();

router.get("/home", async (req, res) => {
  res.json({ test: "test" });
});

module.exports = router;
