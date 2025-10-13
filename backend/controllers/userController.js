// GET /api/users/me
// Returns authenticated user's profile
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
// userController.js
// User registration and login logic for HeavySync backend
// See: https://github.com/Hasintha01/HeavySync for API details
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// POST /api/users/login
// Authenticates user and returns JWT token
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    // Issue JWT token for authenticated user
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );
    res.json({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// POST /api/users/register
// Registers a new user account
exports.register = async (req, res) => {
  try {
    const { fullName, username, email, password, phone, role } = req.body;
    // Basic validation
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Prevent duplicate usernames/emails
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    // Save new user to database
    const user = new User({ fullName, username, email, password, phone, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message, stack: err.stack });
  }
};
