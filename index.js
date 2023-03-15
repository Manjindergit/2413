const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded({ extended: true });

const app = express();
app.use("/assets", express.static("assets"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "info2413",
});

// connect to the database
connection.connect(function (error) {
  if (error) throw error;
  else console.log("connected to the database successfully!");
});

app.get("/", function (req, res) {
  

  res.sendFile(__dirname + "/index.html");
});

app.post("/", encoder, function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  connection.query(
    "select * from user where userID = ? and password = ?",
    [username, password],
    function (error, results, fields) {
      if (results.length > 0) {
        res.redirect("/welcome");
      } else {
        res.redirect("/");
      }
      res.end();
    }
  );
});

app.post('/signup', encoder, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const fullName= req.body.fullName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const accountType = req.body.accountType;

  
  // insert a new row into the loginuser table
  const sql = `INSERT INTO user (userID, password, name, email, number, address, accounttype) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  connection.query(sql, [username, password, fullName, email, phoneNumber, address, accountType], (err, result) => {
    if (err) {
      console.error('Error adding user to loginuser table: ' + err.stack);
      res.status(500).send('Error adding user to loginuser table.');
      return;
    }
    console.log('New user added to loginuser table.');
    res.status(200).send('New user added to loginuser table.');
  });
});

// when login is success
app.get("/welcome", function (req, res) {
  res.render("welcome.ejs", { message: "Hello world" });
});

// set app port
app.listen(3916);
