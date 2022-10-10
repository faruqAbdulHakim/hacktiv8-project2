const socialMediasRouter = require('express').Router();
const authMiddleware = require('./../middlewares/authMiddleware');
const SocialMediaController = require('./../controllers/SocialMediaController');

socialMediasRouter.use(authMiddleware);
socialMediasRouter.get('/', SocialMediaController.findAll);
socialMediasRouter.post('/', SocialMediaController.create);
socialMediasRouter.put('/:socialMediaId', SocialMediaController.update);
socialMediasRouter.delete('/:socialMediaId', SocialMediaController.delete);

module.exports = socialMediasRouter;
