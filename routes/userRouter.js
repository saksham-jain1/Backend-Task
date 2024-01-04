const express = require("express");
const router = express.Router();
const { createUser, authUser } = require("../controllers/UserController");

router.route("/").post(createUser);
router.route("/login").post(authUser);

module.exports = router;
