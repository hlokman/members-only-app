const Message = require("../models/message");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.index = async function (req, res, next) {
  try {
    const allMessages = await Message.find({})
      .sort({ timestamp: 1 })
      .populate("user")
      .exec();
    res.render("index", {
      title: "Homepage",
      messages: allMessages,
      user: req.user,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.create_post_form_get = (req, res, next) => {
  res.render("post", { title: "Create a Post", user: req.user, message: "" });
};

exports.create_post_form_post = [
  body("title", "The title must contain between 1 and 30 characters")
    .trim()
    .isLength({ min: 1, max: 30 })
    .escape(),
  body("post", "The post must be between 1 and 280 characters")
    .trim()
    .isLength({ min: 1, max: 280 })
    .escape(),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const post = new Message({
        title: req.body.title,
        text: req.body.post,
        user: req.user._id,
      });

      if (!errors.isEmpty()) {
        res.render("post", {
          title: "Create a Post",
          user: req.user,
          post: post,
          errors: errors.array(),
        });
        return;
      } else {
        await post.save();
        res.redirect("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  },
];

exports.user_delete_get = (req, res, next) => {
  res.render("delete", {
    title: "Delete Post",
    user: req.user,
    userPostId: req.params.id,
  });
};

exports.user_delete_post = async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    //console.log("req.params: " + req.params.id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
