// PUT /api/users/me
// Updates authenticated user's profile (fullName, phone)
exports.updateMe = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fullName, phone } = req.body;
    // Only allow updating fullName and phone
    const update = {};
    if (fullName) update.fullName = fullName;
    if (phone) update.phone = phone;
    const user = await User.findByIdAndUpdate(userId, update, { new: true, runValidators: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/users/change-password
// Changes authenticated user's password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Old and new password required' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
// POST /api/users/check-username
// Checks if a username already exists
exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }
    const user = await User.findOne({ username });
    res.json({ exists: !!user });
  } catch (err) {
    console.error('Check username error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
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
    console.log('Login attempt for username:', username);
    
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    
    console.log('User found, comparing password...');
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);
    
    if (!isMatch) {
      console.log('Password mismatch for user:', username);
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    
    // Verify JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables');
      return res.status(500).json({ message: 'Server configuration error' });
    }
    
    // Issue JWT token for authenticated user
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    console.log('Login successful for user:', username);
    res.json({ token, message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// POST /api/users/register
// Registers a new user account
exports.register = async (req, res) => {
  try {
    const { fullName, username, email, password, phone, role } = req.body;
    console.log('Register request body:', req.body);
    // Basic validation
    if (!fullName || !username || !email || !password) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Prevent duplicate usernames/emails
    let existingUser;
    try {
      existingUser = await User.findOne({ $or: [{ username }, { email }] });
    } catch (dbFindErr) {
      console.error('Database error during user lookup:', dbFindErr);
      return res.status(500).json({ message: 'Database error during user lookup', error: dbFindErr.message });
    }
    if (existingUser) {
      console.log('Validation failed: Username or email already exists');
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    // Save new user to database
    let user;
    try {
      user = new User({ fullName, username, email, password, phone, role });
      await user.save();
    } catch (saveErr) {
      console.error('Error saving user:', saveErr);
      // If validation error, send details
      if (saveErr.name === 'ValidationError') {
        const fieldErrors = {};
        Object.keys(saveErr.errors).forEach(field => {
          fieldErrors[field] = saveErr.errors[field].message;
        });
        return res.status(400).json({ message: 'Validation error', errors: fieldErrors });
      }
      return res.status(500).json({ message: 'Error saving user', error: saveErr.message });
    }
    console.log('User registered successfully:', user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message, stack: err.stack });
  }
};
