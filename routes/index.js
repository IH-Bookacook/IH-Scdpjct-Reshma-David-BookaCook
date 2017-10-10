const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.locals.title = "Welcome to Book a Cook";
  res.render("index");
});

module.exports = router;
