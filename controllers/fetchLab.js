const db = require("../routes/db-config");

const fetchLab = async (req, res) => {
  const { id } = req.body;

  let sql = 'SELECT * FROM lab_exams';

  if(id){
    sql += ` where patient_id=${id}`;
  }

  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.json({ status: "success", patient: result });
  });
};

module.exports = fetchLab;
