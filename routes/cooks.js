const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {ensureLoggedIn} = require('../middlewares/auth');

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

router.get('/.id', ensureLoggedIn, (res, req, next) => {
      User.findOne({
          _id: req.params.id,
          isCook: true,
        },
        (err, cook) => {
          if (err || !cook) {
            req.flash('error', `There's no cook available with id ${req.params.id}`);
            return res.redirect('/cooks');
          }
          res.render('cook-profile', {
            cook: cook,
          });
        }
      );
        })


module.exports = router;
