const db = require("../routes/db-config");

const fetchDoctor = async (req, res) => {
  const { id } = req.body;

  let sql = `SELECT doctors.id, doctors.name, doctors.email, doctors.phone, doctors.specialty FROM visits JOIN patients ON visits.patient_id = patients.id JOIN doctors ON visits.doctor_id = doctors.id WHERE patients.id = ${id}
  `;


  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result[0]);
    return res.json({ status: "success", patient: result });
  });
};

module.exports = fetchDoctor;
