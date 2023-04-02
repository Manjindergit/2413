const db = require("../routes/db-config");

const generateReport = async (req, res) => {
  const { date, reportType } = req.body;
  let sqlDate = "";

  db.query("SELECT * FROM totalVisit", (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      if (result[0].date == date) {
        return res.json({ status: "unsuccessful", report: result });
      }
    }

    if (reportType == "monthly") {
      sqlDate = "MONTH";
    }

    if (reportType == "annual") {
      sqlDate = "YEAR";
    }

    db.query(
      `SELECT doctors.id, COUNT(visits.doctor_id) AS totalNumberOfVisits, '${reportType}' AS reportType, '${date}' AS date
     FROM doctors
     LEFT JOIN visits ON doctors.id = visits.doctor_id
     WHERE ${sqlDate}(visits.date) = ${date}
     GROUP BY doctors.id
     ORDER BY totalNumberOfVisits DESC`,
      (err, result) => {
        if (err) throw err;

        // Insert the results into the totalVisit table
        const insertQuery = `INSERT INTO totalVisit (ownerId, ownerType, totalNumberOfVisits, reportType, date)
                           VALUES ?`;

        const values = result.map((row) => [
          row.id,
          "doctor",
          row.totalNumberOfVisits,
          row.reportType,
          row.date,
        ]);

        db.query(insertQuery, [values], (err, result) => {
          if (err) throw err;

          db.query(
            `SELECT patients.id, COUNT(visits.patient_id) AS totalNumberOfVisits, '${reportType}' AS reportType, '${date}' AS date
         FROM patients
         LEFT JOIN visits ON patients.id = visits.patient_id
         WHERE ${sqlDate}(visits.date) = ${date}
         GROUP BY patients.id
         ORDER BY totalNumberOfVisits DESC`,
            (err, result) => {
              if (err) throw err;

              // Insert the results into the totalVisit table
              const insertnewtQuery = `INSERT INTO totalVisit (ownerId, ownerType, totalNumberOfVisits, reportType, date)
                               VALUES ?`;

              const values = result.map((row) => [
                row.id,
                "patient",
                row.totalNumberOfVisits,
                row.reportType,
                row.date,
              ]);

              db.query(insertnewtQuery, [values], (err, result) => {
                if (err) throw err;

                db.query(
                  `SELECT medicine_name, COUNT(*) AS totalPrescriptions
                FROM prescriptions
                WHERE ${sqlDate}(date) = ${date}
                GROUP BY medicine_name
                ORDER BY totalPrescriptions DESC
                LIMIT 3;`,
                  (err, result) => {
                    if (err) throw err;

                    const anotherQuery = `INSERT INTO top_prescribed_medicines (medicine_name, totalPrescriptions, reportType, date) VALUES ?`;

                    const values = result.map((row) => [
                      row.medicine_name,
                      row.totalPrescriptions,
                      reportType,
                      date,
                    ]);

                    db.query(anotherQuery, [values], (err, result) => {
                      if (err) throw err;
                      return res.json({ status: "success", report: result });
                    });
                    // return res.json({ status: "success", report: result });
                  }
                );
              });
            }
          );
        });
      }
    );
  });
};

module.exports = generateReport;
