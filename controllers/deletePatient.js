const db = require("../routes/db-config");

const deleteUser = async (req, res) => {
  const { user_id } = req.body;
  console.log("user_id", user_id);
  db.query(
    `DELETE FROM prescriptions WHERE visit_id IN (SELECT id FROM visits WHERE patient_id = ?)`,
    [user_id],
    (err, result) => {
      if (err) throw err;
      db.query(
        `DELETE FROM visits WHERE patient_id = ?`,
        [user_id],
        (err, result) => {
          if (err) throw err;
          db.query(
            `DELETE FROM lab_exams WHERE patient_id = ?`,
            [user_id],
            (err, result) => {
              if (err) throw err;
              db.query(
                `DELETE FROM patients WHERE id = ?`,
                [user_id],
                (err, result) => {
                  if (err) throw err;
                  db.query(
                    `DELETE FROM users WHERE id = ?`,
                    [user_id],
                    (err, result) => {
                      if (err) throw err;
                      return res.json({
                        status: "success",
                        success: "deleted",
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
};

module.exports = deleteUser;
