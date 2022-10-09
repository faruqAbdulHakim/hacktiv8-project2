const usersRouter = require('express').Router();
const userController = require('./../controllers/UserController');

usersRouter.post('/register', userController.register);

// TODO: create POST to /login

// TODO: create PUT to /:userId

// TODO: create DELETE to /:userId

module.exports = usersRouter;
