const { verify } = require('../helpers/jwtHelper');
const { User } = require('../models/index');
/**
 * @param {Request} req
 * @param {Response} res
 * @param {import('express').NextFunction} next
 */
async function authMiddleware(req, res, next) {
  try {
    const token = req.headers['token'];
    if (!token) throw { name: 'Invalid Token' };

    const accessToken = token.split(' ')[1];
    const { id, email } = verify(accessToken);
    const user = await User.findOne({ where: { id, email } });
    if (!user) throw { name: 'Unauthorized' };
    req.user = { id, email };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authMiddleware;
