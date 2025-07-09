const express = require("express");
const { register, login, changePassword} = require("../controllers/UserController.js");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/change-password', changePassword);

module.exports = router;