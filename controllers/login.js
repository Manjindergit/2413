const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../routes/db-config");

const login = async (req, rez) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return rez.json({ status: "error", error: "Missing userid or password" });
  } else {
    // if(result[0] === "patient"){
    //   db.query(`SELECT approved FROM patients WHERE id= (SELECT id FROM users WHERE username = '${userId}')`, async(err, result) => {
    //     if (err) throw err;
    //     if(result[0].approved === 0){
    //       return res.json({ status: "error", error: "Your account has not been approved yet" });
    //     } else {
    //       loginUser();
    //     }
    //   });
    // } else {
    //   loginUser();
    // }

    db.query(
      "SELECT * FROM users WHERE username=?",
      [userId],
      async (err, result) => {
        if (err) throw err;
        if (
          !result.length ||
          !(await bcrypt.compare(password, result[0].password))
        ) {
          rez.json({
            status: "errorP",
            error: "Invalid Username or password",
          });
        }

        else {
          tallyPatient(result, rez, userId);
        }

        
      }
    );
  }
};

function tallyPatient(result, rez, userId) {
  if (result[0].role === "patient") {
    db.query(
      `SELECT approved FROM patients WHERE id= (SELECT id FROM users WHERE username = '${userId}')`,
      async (err, resu) => {
        if (err) throw err;
        if (resu[0].approved === 0) {
          return rez.json({
            status: "error",
            error: "Your account has not been approved yet",
          });
        } else {
          loginUser(result, rez);
        }
      }
    );
  } else {
    loginUser(result, rez);
  }
}

function loginUser(result, rez) {
  const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  rez.cookie("userRegistered", token, cookieOptions);

  return rez.json({
    status: "success",
    success: "logged in",
    userType: result[0].role,
  });
}

module.exports = login;
