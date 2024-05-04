const bcrypt = require("bcryptjs");
const Message = require("../models/message");
const User = require("../models/user");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

exports.user_login_form_get = async (req, res, next) => {
  try {
    const message = req.session.messages || [];
    req.session.messages = [];

    res.render("user_create_form", {
      title: "Login",
      message: message[0],
      user: req.user,
    });
  } catch (err) {
    console.log(err);
  }
};

// DEFINE THE LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "identifier", // Utilisez 'identifier' au lieu de 'username'
      passwordField: "password", // Confirmer que 'password' est bien le champ pour le mot de passe
    },
    async (identifier, password, done) => {
      //identifier = identifier.toLowerCase();

      try {
        //We can identify via username or email, so we check with "both"
        let user = await User.findOne({ username: identifier.toLowerCase() });
        let usernameDisplayed = identifier;

        if (!user) {
          user = await User.findOne({ email: identifier.toLowerCase() });
          if (user) usernameDisplayed = user.username;
        }

        if (!user) {
          return done(null, false, { message: "Incorrect identifier" });
        }
        /*if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }*/
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }

        //user.toObject(); //convert the Mongoose document to a simple object
        user.usernameDisplayed = usernameDisplayed;
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
//
passport.serializeUser((user, done) => {
  // Stock ID and usernameDisplayed in the session
  done(null, { id: user.id, usernameDisplayed: user.usernameDisplayed });
});
//
passport.deserializeUser(async (data, done) => {
  try {
    const user = await User.findById(data.id);
    /*if (user) {*/
    user.usernameDisplayed = data.usernameDisplayed; // Make sure to restore usernameDisplayed
    done(null, user);
    /*} else {
      done(null, false);
    }*/
  } catch (err) {
    done(err);
  }
});
//--------------------------------------

exports.user_login_form_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureMessage: true,
});

exports.user_logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.user_dashboard = async (req, res, next) => {
  try {
    const userPosts = await Message.find({ user: req.user.id })
      .populate("user")
      .exec();

    res.render("dashboard", {
      title: "Dashboard",
      user: req.user,
      messages: userPosts,
    });
  } catch (err) {
    console.log(err);
  }

  console.log(req.session);
};
