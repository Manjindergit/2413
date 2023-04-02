const db = require("../routes/db-config");

const fetchPatient = async (req, res) => {
  const { user_id,id } = req.body;

  let sql = 'SELECT * FROM patients';
  if (user_id) {
    sql += ` WHERE health_card_number="${user_id}"`;
  }

  if(id){
    sql += ` where id=${id}`;
  }

  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.json({ status: "success", patient: result });
  });
};

module.exports = fetchPatient;
