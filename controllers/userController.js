const bcrypt = require("bcryptjs");
const Message = require("../models/message");
const User = require("../models/user");

exports.user_login_form_get = async (req, res, next) => {
  try {
    res.render("user_create_form", { title: "Login" });
  } catch (err) {
    console.log(err);
  }
};
