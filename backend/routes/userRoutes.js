
// userRoutes.js
// User registration and login API routes for HeavySync backend
const express = require('express');
const { register, login } = require('../controllers/userController');

const router = express.Router();

// POST /api/users/register - create new user
router.post('/register', register);

// POST /api/users/login - authenticate user
router.post('/login', login);

module.exports = router;
