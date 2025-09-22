const express = require("express")
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn")

const { signup, login, logout, user } = require("../controllers/userController")

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/user").get(isLoggedIn, user)
router.route("/logout").get(logout)

module.exports = router