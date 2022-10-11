const { verify } = require('../helpers/jwtHelper');
const { User } = require('../models/index');
/**
 * @param {Request} req
 * @param {Response} res
 * @param {import('express').NextFunction} next
 */
async function authMiddleware(req, res, next) {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) throw { name: 'Invalid Token' };

    const token = authorization.split(' ')[1];
    const { id, email } = verify(token);
    const user = await User.findOne({ where: { id, email } });
    if (!user) throw { name: 'Unauthorized' };
    req.user = { id, email };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authMiddleware;
