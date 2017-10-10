const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.locals.title = "Become A Cook";
  res.render("becomecook");
});

module.exports = router;
