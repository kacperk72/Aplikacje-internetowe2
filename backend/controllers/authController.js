const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "med_app",
});

async function registerUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const surname = req.body.surname;
  const isDoctor = req.body.isDoctor;
  const specialization = req.body.specialization;
  const city = req.body.city;

  try {
    await pool.query(
      "INSERT INTO users (name, surname, login, password, isDoctor) VALUES (?, ?, ?, ?, ?)",
      [name, surname, username, password, isDoctor]
    );

    const [user] = await pool.query(
      "SELECT * FROM users WHERE login = ? AND password = ?",
      [username, password]
    );

    if (user[0].isDoctor === 1) {
      await pool.query(
        "INSERT INTO doctors (user_id, speciality, localization) VALUES (?, ?, ?)",
        [user[0].id, specialization, city]
      );
    }

    res.send("User registered successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

async function loginUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const [results] = await pool.query(
      "SELECT * FROM users WHERE login=? AND password=?",
      [username, password]
    );
    console.log(results.length);
    if (results.length > 0) {
      const user = results[0];
      res.json({
        message: "Zalogowano prawidłowo",
        user: user,
      });
    } else {
      res.status(401).send("Zły login lub hasło, spróbuj ponownie");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

module.exports = {
  registerUser,
  loginUser,
};
