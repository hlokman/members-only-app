const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");

/* GET home page. */
router.get("/", messageController.index);

router.get("/login", userController.user_login_form_get);

router.post("/login", userController.user_login_form_post);

router.get("/logout", userController.user_logout);

router.get("/dashboard", userController.user_dashboard);

router.get("/register", userController.user_register_form_get);

router.post("/register", userController.user_register_form_post);

router.get("/membership", userController.user_membershipForm_get);

router.post("/membership", userController.user_membershipForm_post);

module.exports = router;
