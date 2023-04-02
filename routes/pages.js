const express = require("express");
const fetchPatient = require("../controllers/fetchPatient");
const loggedIn = require("../controllers/loggedIn");
const logout = require("../controllers/logout");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/profile", loggedIn, (req, res) => {
  res.render("profile", { status: "loggedIn", user: req.user });
});

router.get("/register", function (req, res) {
  res.sendFile("register.html", { root: "./public/js" });
});

router.get("/login", function (req, res) {
  res.sendFile("login.html", { root: "./public/js" });
});

router.get("/doctor", loggedIn,  (req, res) => {
  //console.log(req);
  res.render("doctor", { status: "loggedIn", user: req.user });
});

router.get("/staff", loggedIn,   (req, res) => {
  res.render("staff", { status: "loggedIn", user: req.user, patients:[] });
});

router.get("/logout", logout);

module.exports = router;
