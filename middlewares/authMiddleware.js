const { verify } = require('../helpers/jwtHelper');

/**
 * @param {Request} req
 * @param {Response} res
 * @param {import('express').NextFunction} next
 */
const authMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) throw { name: 'Invalid Token' };

    token = authorization.split(' ')[1];
    const { id, email } = verify(token);
    if (!id || !email) throw { name: 'Unauthorized' };
    res.locals.user = { id, email };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
