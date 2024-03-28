const express = require('express');
const mysql = require('mysql');

const app = express();
const cors = require('cors');
const port = 8000;


app.use(cors()); // Enable CORS
app.use(express.json());

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'techie_ecommerce', // Database name
    port: 3306, // MySQL port
    multipleStatements: true, // Allows executing multiple statements in a single query
  });

connection.connect(err => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// POST endpoint to insert user data
app.post('/users', (req, res) => {
    const { name, phone_no, email, password } = req.body;
  
    // Check if all required fields are provided
    if (!name || !phone_no || !email || !password ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
  
    // Insert data into the users table
    const sql = 'INSERT INTO users_info (name, phone_no, email, password) VALUES (?, ?, ?, ?)';
    connection.query(sql, [name, phone_no, email, password], (err, result) => {
      if (err) {
        console.error('Error inserting data: ' + err.message);
        return res.status(500).json({ message: 'Internal server error' });
      }
      console.log('User inserted successfully');
      return res.status(201).json({ message: 'User inserted successfully' });
    });
  });
  
  




app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  })