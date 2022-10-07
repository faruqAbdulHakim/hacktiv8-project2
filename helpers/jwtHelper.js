if (process.env.NODE_ENV !== 'production') require('dotenv').config;
const jwt = require('jsonwebtoken');

/**
 *
 * @param {string} payload
 * @param {jwt.SignOptions | undefined} options
 * @returns
 */

exports.sign = (payload, options) => {
  return jwt.sign(payload, process.env.SECRET_TOKEN, options);
};


/**
 *
 * @param {string} token
 * @param {jwt.VerifyOptions & {complete: true} | undefined} options
 * @returns
 */

exports.verify = (token, options) => {
  return jwt.verify(token, process.env.SECRET_TOKEN, options);
};
