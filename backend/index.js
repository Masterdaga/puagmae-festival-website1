const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // If you set a MySQL password in WAMP, put it here
  database: 'puagmae_festival'
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL database');
});

// ✅ Root route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// ✅ Registration route
app.post('/register', (req, res) => {
  console.log('📥 Received POST /register');
  const { name, email, phone } = req.body;

  // Basic validation
  if (!name || !email || !phone) {
    console.log('⚠️ Missing fields:', req.body);
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if email already exists
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error('❌ Error checking email:', err.message);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      console.log('⚠️ Duplicate registration attempt for:', email);
      return res.status(409).json({ message: 'This email is already registered.' });
    }

    // Insert new user
    const insertQuery = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
    db.query(insertQuery, [name, email, phone], (err, result) => {
      if (err) {
        console.error('❌ Error inserting user:', err.message);
        return res.status(500).json({ message: 'Registration failed' });
      }

      console.log('✅ User registered:', { name, email, phone });
      return res.status(201).json({ message: 'Registration successful!' });
    });
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
