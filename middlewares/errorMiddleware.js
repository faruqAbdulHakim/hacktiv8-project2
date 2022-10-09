/**
 * @param {Error} error
 * @param {Request} req
 * @param {Response} res
 * @param {import('express').NextFunction} next
 */
const errorMiddleware = (error, req, res, next) => {
  let code;
  let message;

  // TODO: update errorMiddleware
  switch (error.name) {
    case 'JsonWebTokenError':
      code = 401;
      message = 'Invalid Token';
      break;
    case 'Invalid Token':
      code = 401;
      message = 'Invalid Token';
      break;
    case 'Unauthorized':
      code = 401;
      message = 'Unauthorized';
      break;
    default:
      code = 500;
      message = 'Internal Server Error';
      break;
  }

  res.status(code).json({ message });
};

module.exports = errorMiddleware;
