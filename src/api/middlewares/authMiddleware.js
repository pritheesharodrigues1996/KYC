const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../../config/key')
exports.authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }
  try {
    const payload = jwt.verify(token, jwtSecretKey);
    req.user = payload;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};



