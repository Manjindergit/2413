const express = require("express");
const register = require("./register");
const login = require("./login");
const loggedIn = require("./loggedIn");
const fetchPatient = require("./fetchPatient");
const updatedPatient = require("./updatedPatient");
const deletePatient = require("./deletePatient");
const visit = require("./visit");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/profile", loggedIn);
router.post("/fetchPatient", fetchPatient);
router.post("/updatedPatient", updatedPatient);
router.post("/deletePatient", deletePatient);
router.post("/visit", visit);


module.exports = router;
