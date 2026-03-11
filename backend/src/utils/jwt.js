const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'change-me';

module.exports = {
  sign(payload, options) {
    return jwt.sign(payload, SECRET, options);
  },
  verify(token) {
    return jwt.verify(token, SECRET);
  }
};
