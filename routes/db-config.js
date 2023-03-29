const mysql = require("mysql");
const dotenv = require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "my_database",
});

module.exports=connection;