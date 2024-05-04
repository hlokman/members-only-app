const Message = require("../models/message");
const User = require("../models/user");

exports.index = async function (req, res, next) {
  try {
    const allMessages = await Message.find({}).populate("user").exec();
    res.render("index", {
      title: "Homepage",
      messages: allMessages,
      user: req.user,
    });
  } catch (err) {
    console.log(err);
  }
};
