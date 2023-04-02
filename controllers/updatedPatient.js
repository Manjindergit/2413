const db = require("../routes/db-config");

const updatedPatient = async (req, res) => {
  const { id,name, email, address, phone_number, health_card_number,active } = req.body;
  db.query(
    `UPDATE patients SET name=?, email=?, address=?, phone=?, health_card_number=?, approved=? WHERE id=?`,
    [
      name,
      email,
      address,
      phone_number,
      health_card_number,
      active,
      id
    ],
    (err, result) => {
      console.log("result", name, email, address, phone_number, health_card_number,active,health_card_number);
      if (err) throw err;
      console.log(result);
      return res.json({ status: "success", success: "updated" });

     
    }
  );
};

module.exports = updatedPatient;
