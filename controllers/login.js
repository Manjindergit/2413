const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../routes/db-config");

const login = async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.json({ status: "error", error: "Missing userid or password" });
  } else {
    db.query(
      "SELECT * FROM users WHERE username=?",
      [userId],
      async (err, result) => {
        if (err) throw err;
        if (
          !result.length ||
          !(await bcrypt.compare(password, result[0].password))
        ) {
          res.json({
            status: "error",
            error: "Invalid Username or password",
          });
        } else {
          const token = jwt.sign(
            { id: result[0].id },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.JWT_EXPIRES_IN,
            }
          );

          const cookieOptions = {
            expiresIn: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
          res.cookie("userRegistered", token, cookieOptions);

          return res.json({
            status: "success",
            success: "logged in",
            userType: result[0].role,
          });
        }
      }
    );
  }
};

module.exports = login;
