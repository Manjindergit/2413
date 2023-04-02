const express = require("express");
const register = require("./register");
const login = require("./login");
const loggedIn = require("./loggedIn");
const fetchPatient = require("./fetchPatient");
const updatedPatient = require("./updatedPatient");
const deletePatient = require("./deletePatient");
const visit = require("./visit");
const generateReport = require("./generateReport");
const fetchLab = require("./fetchLab");
const fetchPres = require("./fetchPres");
const fetchDoctor=require("./fetchDoctor");
const fetchReport = require("./fetchReport");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/profile", loggedIn);
router.post("/fetchPatient", fetchPatient);
router.post("/updatedPatient", updatedPatient);
router.post("/deletePatient", deletePatient);
router.post("/visit", visit);
router.post("/generateReport", generateReport);
router.post("/fetchLab", fetchLab);
router.post("/fetchPres", fetchPres);
router.post("/fetchDoctor",fetchDoctor);
router.post("/fetchReport",fetchReport);

module.exports = router;
