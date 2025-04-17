import express from 'express';
import connection  from '../db.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { fullName, email, password, confirmPassword, termsAccepted } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  if (!termsAccepted) {
    return res.status(400).json({ message: 'You must agree to the terms' });
  }

  try {
    const [existing] = await connection.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const [result] = await connection.execute(
      'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)',
      [fullName, email, password] // 🔒 You should hash password in real apps
    );

    res.status(201).json({ message: 'User registered', userId: result.insertId });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
router.get('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows] = await connection.execute(
      'SELECT id, full_name, email FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { fullName, email } = req.body;

  try {
    await connection.execute(
      'UPDATE users SET full_name = ?, email = ? WHERE id = ?',
      [fullName, email, userId]
    );
    res.json({ message: 'Profile updated' });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
