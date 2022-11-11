const usersRouter = require('express').Router();
const userController = require('./../controllers/UserController');
const authMiddleware = require('./../middlewares/authMiddleware');

usersRouter.post('/register', userController.register);
usersRouter.post('/login', userController.login);
usersRouter.use(authMiddleware);
usersRouter.use('/:userId', userController.authorize);
usersRouter.put('/:userId', userController.update);
usersRouter.delete('/:userId', userController.delete);

module.exports = usersRouter;
