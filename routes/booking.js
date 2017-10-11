const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("../middlewares/auth");
const User = require("../models/user");
const Booking = require("../models/booking");

router.get("/:id/booking", ensureLoggedIn, (req, res) => {
  User.findOne(
    {
      _id: req.params.id,
      isCook: true
    },
    (err, cook) => {
      if (err || !cook) {
        req.flash(
          "error",
          `There's no cook available with id ${req.params.id}`
        );
        return res.redirect("/cooks");
      }
      res.render("booking", {
        cook: cook
      });
    }
  );
});

module.exports = router;
