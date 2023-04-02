const db = require("../routes/db-config");

const visit = async (req, res) => {
  const {
    patient_id,
    doctor_id,
    date,
    description,
    exam,
    medicine_name,
    quantity,
    dosage,
    refillable,
  } = req.body;
  try {
    await db.query(
      "INSERT INTO visits (patient_id, doctor_id, date, description) VALUES (?,?,?,?)",
      [patient_id, doctor_id, date, description],
      async (err, result) => {
        if (err) throw err;

        const visitID = result.insertId; // Retrieve the last inserted ID using insertId property
        await db.query(
          "INSERT INTO prescriptions (visit_id, medicine_name, quantity, dose, refillable, date)  VALUES (?, ?, ?, ?,?,?)",
          [visitID, medicine_name, quantity, dosage, refillable, date]
        );

        await db.query(
          "INSERT INTO lab_exams (patient_id, doctor_id, exam_item, date) VALUES (?, ?, ?, ?)",
          [patient_id, doctor_id, exam, date]
        );

        return res.json({ status: "success" });
        // Log the visitID value
        // return res.json({ status: "success", success: "updated", visitID }); // Return the visitID value in the response
      }
    );
    
    // await console.log(visitResut.insertId, "visitResult");

    
  } catch (error) {
    return res.json({ status: "error", error: "Failed to add visit details." });
  }
};

module.exports = visit;
