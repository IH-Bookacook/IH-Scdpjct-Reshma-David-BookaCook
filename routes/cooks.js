const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res, next) => {
  User.find(
    {
      isCook: true
    },
    (err, cooks) => {
      if (err) return next(err);
      res.render("cooks", {
        cooks: cooks,
        errorMessage: req.flash("error")
      });
    }
  );
});


module.exports = router;
