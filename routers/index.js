const router = require('express').Router();
const usersRouter = require('./usersRouter');
const photosRouter = require('./photosRouter');
const commentsRouter = require('./commentsRouter');
const socialMediasRouter = require('./socialmediasRouter');

router.use('/users', usersRouter);
router.use('/photos', photosRouter);
router.use('/comments', commentsRouter);
router.use('/socialmedias', socialMediasRouter);

module.exports = router;
