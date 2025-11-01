
// userRoutes.js
// User registration and login API routes for HeavySync backend
const express = require('express');
const { register, login, getMe, checkUsername, updateMe, changePassword } = require('../controllers/userController');
const auth = require('../middleware/auth');
const { validateUserRegistration, validateUserLogin } = require('../middleware/validation');

const router = express.Router();
// POST /api/users/check-username - check if username exists
router.post('/check-username', checkUsername);

// POST /api/users/register - create new user
router.post('/register', validateUserRegistration, register);

// POST /api/users/login - authenticate user
router.post('/login', validateUserLogin, login);

// GET /api/users/me - get current user profile
router.get('/me', auth, getMe);

// PUT /api/users/me - update current user profile
router.put('/me', auth, updateMe);

// POST /api/users/change-password - change current user password
router.post('/change-password', auth, changePassword);

module.exports = router;
