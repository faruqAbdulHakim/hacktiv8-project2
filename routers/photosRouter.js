const photosRouter = require('express').Router();
const PhotoController = require('./../controllers/PhotoController');
const authMiddleware = require('./../middlewares/authMiddleware');

photosRouter.use(authMiddleware);
photosRouter.get('/', PhotoController.findAll);
photosRouter.post('/', PhotoController.create);
photosRouter.use('/:photoId', PhotoController.authorize);
photosRouter.put('/:photoId', PhotoController.update);
photosRouter.delete('/:photoId', PhotoController.delete);

module.exports = photosRouter;
