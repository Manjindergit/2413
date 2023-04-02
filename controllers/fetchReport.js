const db = require("../routes/db-config");

const fetchReport = async (req, res) => {
  const { date, reportType } = req.body;

  let sql = `SELECT medicine_name, totalPrescriptions FROM top_prescribed_medicines WHERE date = '${date}' AND reportType = '${reportType}'`;
  db.query(sql, (err, result1) => {
    if (err) throw err;
    let sql2 = `SELECT ownerId, totalNumberOfVisits, ownerType FROM totalVisit WHERE date = '${date}' AND reportType = '${reportType}'`;
    db.query(sql2, (err, result2) => {
      if (err) throw err;
      // console.log(result1[0], result1[1], result2[0], result2[1]){
      return res.json({ status: "success", topPrescribedMedicines: result1, totalVisits: result2 });
      
    });
  });
};

module.exports = fetchReport;
