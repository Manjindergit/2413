const db = require('../routes/db-config');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { username, name, email, password: normalPassword, address, phoneNumber, accountType, healthCardNumber, speciality } = req.body;
console.log(username, name, email, normalPassword, address, phoneNumber, accountType, healthCardNumber, speciality);
    if (!email || !normalPassword) {
        return res.json({ status: 'error', error: 'Missing email or password' });
    } else {
        const sql = 'SELECT username FROM users WHERE username=?';
        db.query(sql, [username], async (err, result) => {
            if (err) throw err;
            if (result.length > 0) return res.json({ status: 'error', error: 'Username already registered' });
            else {
                const password = bcrypt.hashSync(normalPassword, 4);

                try {
          // Wait for the INSERT query to finish
          await db.query('INSERT INTO users (username, password, role) VALUES (?,?,?)', [username, password, accountType]);
          // Once the user is inserted, insert the patient
        
          if(accountType === 'patient'){
             const Sql = 'INSERT INTO patients (name, email, address, phone, health_card_number, id) VALUES (?, ?, ?, ?, ?, (SELECT id FROM users WHERE username = ?))';
             await db.query(Sql, [name, email, address, phoneNumber, healthCardNumber, username]);
          }
          
          if(accountType === 'doctor'){
            const Sql = 'INSERT INTO doctors (name, email, phone, specialty, id) VALUES (?, ?, ?, ?, (SELECT id FROM users WHERE username = ?))';
            await db.query(Sql, [name, email, phoneNumber, speciality, username]);
         }
          

          return res.json({ status: 'success' });
        } catch (error) {
          throw error;
        }
            }

        });
    }

}

module.exports = register;
