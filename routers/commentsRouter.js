const commentsRouter = require('express').Router();
const authMiddleware = require('./../middlewares/authMiddleware');
const CommentController = require('./../controllers/CommentController');

commentsRouter.use(authMiddleware);
commentsRouter.get('/', CommentController.findAll);
commentsRouter.post('/', CommentController.create);
commentsRouter.put('/:commentID', CommentController.update);
commentsRouter.delete('/:commentID', CommentController.delete);

// TODO: create GET to /

// TODO: create POST to /

// TODO: create PUT to /:commentId

// TODO: create DELETE to /:commentId

module.exports = commentsRouter;
