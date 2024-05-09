const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");
const isAuth = require("../authMiddleware").isAuth;
const isAuth2 = require("../authMiddleware").isAuth2;
const isAlreadyAdmin = require("../authMiddleware").isAlreadyAdmin;
const isAlreadyMember = require("../authMiddleware").isAlreadyMember;
const isNotMem = require("../authMiddleware").isNotMem;

/* GET home page. */
router.get("/", messageController.index);

router.get("/login", isAuth2, userController.user_login_form_get);

router.post("/login", userController.user_login_form_post);

router.get("/logout", isAuth, userController.user_logout);

router.get("/dashboard", isAuth, userController.user_dashboard);

router.get("/register", isAuth2, userController.user_register_form_get);

router.post("/register", userController.user_register_form_post);

router.get(
  "/membership",
  isAuth,
  isAlreadyMember,
  isAlreadyAdmin,
  userController.user_membershipForm_get
);

router.post("/membership", userController.user_membershipForm_post);

router.get(
  "/admin",
  isAuth,
  isNotMem,
  isAlreadyAdmin,
  userController.user_adminForm_get
);

router.post("/admin", userController.user_adminForm_post);

router.get("/create_post", isAuth, messageController.create_post_form_get);

router.post("/create_post", messageController.create_post_form_post);

router.get("/delete/:id", isAuth, messageController.user_delete_get);

router.post("/delete/:id", messageController.user_delete_post);

module.exports = router;
