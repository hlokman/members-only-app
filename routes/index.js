const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");

/* GET home page. */
router.get("/", messageController.index);

router.get("/login", userController.user_login_form_get);

module.exports = router;
