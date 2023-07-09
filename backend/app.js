const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

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
        if(password == results[0].password) {
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


app.get('/reviews', async (req, res) => {
    const userId = req.query.userId;
  
    try {
      const [reviews] = await pool.query('SELECT * FROM comments WHERE user_id = ?', [userId]);
      res.send(reviews);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});