const config = require('config');
const JWT_SECRET = config.get('jwtSecret');
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Token is required' });
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  };
};

module.exports = { requireAuth, requireRole };
