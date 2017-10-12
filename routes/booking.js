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
    customer: req.user._id,
    cook: req.params.id,
    dateStart: new Date(req.body.startDate + " " + req.body.startTime),
    dateEnd: new Date(req.body.startDate + " " + req.body.endTime),
    // duration: req.body.duration,
    numberOfPeople: req.body.people,
    specRequirements: req.body.special
  });

  Booking.count({
    $and: [
      {
        cook: booking.cook
      },
      {
        $or: [{ dateStart: { $gte: booking.dateStart, $lte: booking.dateEnd } }]
      }
    ]
  }).then(num => {
    console.log("The cook is" + booking.cook);
    console.log("The start date is" + booking.dateStart);
    console.log("The end date is" + booking.dateEnd);
    console.log("The number of conflicting bookings is " + num);
    if (num !== 0) {
      message: "This cook is already book at that time";
    } else {
    }
  });

  booking
    .save()
    .then(savedBooking => {
      return savedBooking
        .populate("customer")
        .populate("cook")
        .execPopulate();
    })
    .then(populatedBooking => {
      res.render("booking-conf", {
        booking: populatedBooking
      });
    });
});

module.exports = router;
