const photosRouter = require('express').Router();
const PhotoController = require('./../controllers/PhotoController');
const authMiddleware = require('./../middlewares/authMiddleware');
const authorization = require('./../middlewares/authorization');

photosRouter.use(authMiddleware);
photosRouter.get('/', PhotoController.findAll);
photosRouter.post('/', PhotoController.create);
photosRouter.use('/:photoId', authorization);
photosRouter.put('/:photoId', PhotoController.update);
photosRouter.delete('/:photoId', PhotoController.delete);

module.exports = photosRouter;
