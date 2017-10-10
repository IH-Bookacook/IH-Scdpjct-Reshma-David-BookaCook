const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.locals.title = "Our Cooks";
  res.render("cooks");
});

module.exports = router;
