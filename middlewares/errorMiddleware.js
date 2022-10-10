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
    case 'BadRequest':
      code = 400;
      message = 'Bad Request';
      break;
    case 'SequelizeValidationError':
      code = 400;
      message = 'Bad Request, Validation Error';
      break;
    case 'SequelizeUniqueConstraintError':
      code = 400;
      message = 'Bad Request, Unique Constraint Error';
      break;
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
    case 'userNotFound':
      code = 404;
      message = 'Fail, Login User not found';
      break;
    case 'WrongPassword':
      code = 400;
      message = 'Fail, Your password incorrect';
      break;
    default:
      code = 500;
      message = 'Internal Server Error';
      break;
  }

  res.status(code).json({ message });
};

module.exports = errorMiddleware;
