const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for registered users
const registeredUsers = [];

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/register', (req, res) => {
  console.log('Received POST /register');
  const { name, email, phone } = req.body;

  // Basic validation
  if (!name || !email || !phone) {
    console.log('Missing fields in request body:', req.body);
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if email already registered
  const userExists = registeredUsers.some(user => user.email === email);
  if (userExists) {
    console.log('Duplicate registration attempt:', email);
    return res.status(409).json({ message: 'This email is already registered.' });
  }

  // Add user to registered list
  registeredUsers.push({ name, email, phone });
  console.log('User registered:', { name, email, phone });

  res.status(201).json({ message: 'Registration successful!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
