const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require('../middlewares/auth');
const User = require("../models/user")

router.get("/", (req, res) => {
  res.locals.title = "Become A Cook";
  res.render("becomecook");
});

router.post("/", ensureLoggedIn, (req,res,next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        isCook : true,
        "cookData.cuisine" : req.body.cuisine,
        "cookData.experience" : req.body.experience,
        "cookData.description" : req.body.description,
        "cookData.location" : req.body.location,
        "cookData.availability" : req.body.availability,
      }
    })
    .then(user => {
      req.user = user
      res.redirect('/')
    })
    .catch(err => next(err))
});

module.exports = router;
