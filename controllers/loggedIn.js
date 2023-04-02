const db = require('../routes/db-config');
const jwt = require('jsonwebtoken');



const loggedIn = (req, res, next) => {
    //console.log(req.cookies);
  //console.log('It was in loggedIn');
 // if (!req.cookies.userRegistered) return next();
  try {
    const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
    console.log("Decoded",decoded)
    db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
      if (err) throw err;
      req.user = result[0];
   
      return next();
    });
  } catch (err) {
  
    return next();
  }
}

module.exports = loggedIn;
