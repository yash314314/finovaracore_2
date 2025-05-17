
const express = require('express');
const loginUser = require("../controller/loginuser");
const router = express.Router();
const getAadhaarStatus = require("../controller/umang");
const signupUser = require("../controller/signupuser");
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post("/aadhaar-status", getAadhaarStatus);
module.exports = router;
