const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'med_app'
});

app.get('/api/doctors', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT users.id as user_id, users.name, users.surname, doctors.speciality, doctors.localization
        FROM users
        JOIN doctors ON users.id = doctors.user_id`
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/doctor/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [[doctor]] = await pool.query(
            `SELECT users.id as user_id, users.name, users.surname, doctors.speciality, doctors.localization
            FROM users
            JOIN doctors ON users.id = doctors.user_id
            WHERE users.id = ?`, [id]
        );

        const [[{ avg_mark }]] = await pool.query(
            'SELECT AVG(mark) as avg_mark FROM comments WHERE doctor_id = ?', [id]
        );

        if(doctor) {
            doctor.avg_mark = parseFloat(avg_mark).toFixed(2);
            res.json(doctor);
        } else {
            res.status(404).send('Doctor not found');
        }
    } catch (error) {
        console.error('Error fetching doctor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/doctors/search', async (req, res) => {
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
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/reviews/:doctorId', async (req, res) => {
    const { doctorId } = req.params;
    try {
        const [reviews] = await pool.query(`
            SELECT comments.*, users.name as author_name, users.surname as author_surname 
            FROM comments 
            JOIN users ON comments.user_id = users.id 
            WHERE doctor_id = ?
        `, [doctorId]);
        res.send(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/reviewsByUser/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const [reviews] = await pool.query(`
            SELECT comments.*, u.name as author_name, u.surname as author_surname,
            d.name as doctor_name, d.surname as doctor_surname
            FROM comments 
            JOIN users u ON comments.user_id = u.id 
            JOIN doctors ON comments.doctor_id = doctors.user_id
            JOIN users d ON doctors.user_id = d.id
            WHERE comments.user_id = ?
        `, [userId]);
        res.send(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send('Server error');
    }
});

app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const surname = req.body.surname;
    const isDoctor = req.body.isDoctor;

    try {
        await pool.query(
            'INSERT INTO users (name, surname, login, password, isDoctor) VALUES (?, ?, ?, ?, ?)',
            [name, surname, username, password, isDoctor]
        );
        res.send('User registered successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const [results] = await pool.query('SELECT * FROM users WHERE login = ?', [username]);
        if (results.length > 0) {
            const user = results[0];
            if(password == user.password) {
                res.json({
                    message: 'Logged in successfully',
                    user: user
                });
            } else {
                res.send('Wrong username/password combination');
            }
        } else {
            res.send('User does not exist');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
