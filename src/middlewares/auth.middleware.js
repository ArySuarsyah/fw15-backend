/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const errorHandler = require('../helpers/errorHandler')

const authMiddleware = (req, res, next) => {
  try {
  const {authorization} = req.headers
  if (!authorization && !authorization?.startsWith('Bearer ')) {
    throw Error('Unauthorized')
  }
    const token = authorization.slice(7)
    req.user = jwt.verify(token, SECRET_KEY);
        next();
  } catch (err) {
    return errorHandler(err, res)
  }
};


module.exports = authMiddleware