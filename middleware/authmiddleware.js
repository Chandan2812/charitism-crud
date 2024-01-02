const jwt = require('jsonwebtoken');
require("dotenv").config();

// Middleware to authenticate requests using JWT token
const authenticateToken = (req, res, next) => {
  // Extract the JWT token from the Authorization header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided.' });
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
