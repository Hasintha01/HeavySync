
// userRoutes.js
// User registration and login API routes for HeavySync backend
const express = require('express');
const { register, login, getMe } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/users/register - create new user
router.post('/register', register);

// POST /api/users/login - authenticate user
router.post('/login', login);

// GET /api/users/me - get current user profile
router.get('/me', auth, getMe);

module.exports = router;
