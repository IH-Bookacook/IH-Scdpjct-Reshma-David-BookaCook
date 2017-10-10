const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

// Signing Up
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email"
    },
    (req, email, password, next) => {
      // To avoid race conditions
      process.nextTick(() => {
        // Destructure the body
        const { name } = req.body;
        const hashPass = bcrypt.hashSync(
          password,
          bcrypt.genSaltSync(10),
          null
        );
        const user = new User({
          name,
          email,
          password: hashPass
        });

        user.save(err => {
          if (err) {
            // duplicated email
            if (err.code === 11000) {
              return next(null, false, {
                message: `email ${email} is already used`
              });
            }
          }
          next(err, user);
        });
      });
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email"
    },
    (email, password, next) => {
      User.findOne({ email }, (err, user) => {
        if (err) return next(err);
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return next(null, false, {
            message: "Email and password do not match"
          });
        }

        return next(null, user);
      });
    }
  )
);

function setup(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });
}

module.exports = setup;
