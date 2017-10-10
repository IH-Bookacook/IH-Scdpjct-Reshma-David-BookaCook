const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('../middlewares/auth');

router.get('/signup', ensureLoggedOut, (req, res, next) => {
  res.render('auth/signup', {
    errorMessage: req.flash('error'),
  });
});

module.exports = router;
