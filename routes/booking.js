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

router.post("/:id/booking", ensureLoggedIn, (req, res, next) => {
  console.log("I am req.user " + req.user);
  console.log("I am req.params " + req.params);
  const booking = new Booking({
    customerId: req.user._id,
    cookId: req.params.id,
    date: req.body.date,
    time: req.body.time,
    duration: req.body.duration,
    numberOfPeople: req.body.people,
    specRequirements: req.body.special
  });

  booking
    .save()
    .then(savedBooking => {
      return savedBooking
        .populate("customerId")
        .populate("cookId")
        .execPopulate();
    })
    .then(populatedBooking => {
      res.render("booking-conf", {
        booking: populatedBooking
      });
    });
});

module.exports = router;
