module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    /*res.render("user_login_form", {
      title: "Login",
      message: "You must be connected ",
      user: req.user,
    });*/
    res.redirect("/login");
  }
};

module.exports.isAuth2 = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/dashboard");
  }
};

module.exports.isAlreadyAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

module.exports.isAlreadyMember = (req, res, next) => {
  if (req.isAuthenticated() && req.user.membership) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

module.exports.isNotMem = (req, res, next) => {
  if (req.isAuthenticated() && !req.user.membership && !req.user.isAdmin) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};
