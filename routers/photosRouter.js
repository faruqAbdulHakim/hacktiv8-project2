const photosRouter = require('express').Router();
const PhotoController = require('./../controllers/PhotoController');
const authMiddleware = require('./../middlewares/authMiddleware');

photosRouter.use(authMiddleware);
photosRouter.get('/', PhotoController.findAll);
photosRouter.post('/', PhotoController.create);
photosRouter.put('/:photoID', PhotoController.update);
photosRouter.delete('/:photoID', PhotoController.delete);

module.exports = photosRouter;
