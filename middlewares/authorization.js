const { Photo, User } = require('../models/index');
/**
 * @param {Request} req
 * @param {Response} res
 * @param {import('express').NextFunction} next
 */
async function authorization(req, res, next) {
  try {
    const { photoId } = req.params;
    const authenticatedUser = req.user.id;

    const photo = await Photo.findOne({
      where: {
        id: photoId,
      },
    });

    if (!photo) {
      return res.status(404).json({
        name: 'Data Not Found',
        devMessage: `Photo with id "${photoId}" not found`,
      });
    }

    if (photo.UserId === authenticatedUser) {
      return next();
    } else {
      return res.status(403).json({
        name: 'Authorization Error',
        devMessage: `User with id "${authenticatedUser}" does not have permission to access Photo with id "${photoId}"`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = authorization;
