const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.locals.title = "Our Cuisine";
  res.render("ourcuisine");
});

module.exports = router;
