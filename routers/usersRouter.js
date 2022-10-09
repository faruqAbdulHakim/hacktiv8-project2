const usersRouter = require('express').Router();
const userController = require('./../controllers/UserController');

usersRouter.post('/register', userController.register);

usersRouter.post('/login', userController.login);

// TODO: create PUT to /:userId

// TODO: create DELETE to /:userId

module.exports = usersRouter;
