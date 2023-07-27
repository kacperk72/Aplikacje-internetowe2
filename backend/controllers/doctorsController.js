const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "med_app",
});

async function getDoctors(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT users.id as user_id, users.name, users.surname, doctors.speciality, doctors.localization
        FROM users
        JOIN doctors ON users.id = doctors.user_id`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getDoctorById(req, res) {
  const { id } = req.params;
  try {
    const [[doctor]] = await pool.query(
      `SELECT users.id as user_id, users.name, users.surname, doctors.speciality, doctors.localization
            FROM users
            JOIN doctors ON users.id = doctors.user_id
            WHERE users.id = ?`,
      [id]
    );

    const [[{ avg_mark }]] = await pool.query(
      "SELECT AVG(mark) as avg_mark FROM comments WHERE doctor_id = ?",
      [id]
    );

    if (doctor) {
      doctor.avg_mark = parseFloat(avg_mark).toFixed(2);
      res.json(doctor);
    } else {
      res.status(404).send("Doctor not found");
    }
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function searchDoctors(req, res) {
  const { query } = req.query;

  try {
    const [rows] = await pool.query(
      `SELECT users.id as user_id, users.name, users.surname, doctors.speciality, doctors.localization
            FROM users
            JOIN doctors ON users.id = doctors.user_id
            WHERE users.name LIKE ? OR users.surname LIKE ?`,
      [`%${query}%`, `%${query}%`]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getDoctorReviews(req, res) {
  const { doctorId } = req.params;
  try {
    const [reviews] = await pool.query(
      `
            SELECT comments.*, users.name as author_name, users.surname as author_surname 
            FROM comments 
            JOIN users ON comments.user_id = users.id 
            WHERE doctor_id = ?
        `,
      [doctorId]
    );
    res.send(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send("Server error");
  }
}

async function getReviewsByUser(req, res) {
  const { userId } = req.params;
  try {
    const [reviews] = await pool.query(
      `
            SELECT comments.*, u.name as author_name, u.surname as author_surname,
            d.name as doctor_name, d.surname as doctor_surname
            FROM comments 
            JOIN users u ON comments.user_id = u.id 
            JOIN doctors ON comments.doctor_id = doctors.user_id
            JOIN users d ON doctors.user_id = d.id
            WHERE comments.user_id = ?
        `,
      [userId]
    );
    res.send(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send("Server error");
  }
}

async function submitReview(req, res) {
  const { userId, doctorId, mark, comment } = req.body;
  try {
    await pool.query(
      "INSERT INTO comments (doctor_id, user_id, comment, mark) VALUES (?, ?, ?, ?)",
      [doctorId, userId, comment, mark]
    );
    res.send("Review submitted successfully");
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).send("Server error");
  }
}

module.exports = {
  getDoctors,
  getDoctorById,
  searchDoctors,
  getDoctorReviews,
  getReviewsByUser,
  submitReview,
};
