
// auth.js
// JWT authentication middleware for HeavySync backend
// Usage: Add as middleware to protect routes (e.g. router.post('/route', auth, handler))
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  // Check for Bearer token in Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = auth;
