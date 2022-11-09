const { Photo, User } = require('./../models/index');

class PhotoController {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {import('express').NextFunction} next
   */
  static async findAll(req, res, next) {
    try {
      const photos = await Photo.findAll({
        where: { UserId: req.user.id },
        attributes: {
          exclude: ['UserId'],
        },
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'profile_image_url'],
          },
        ],
      });
      res.status(200).json({ photos });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {import('express').NextFunction} next
   */
  static async create(req, res, next) {
    try {
      const { title, caption, poster_image_url } = req.body;
      const UserId = req.user.id;
      const result = await Photo.create({
        poster_image_url,
        title,
        caption,
        UserId,
      });
      res.status(201).json({
        id: result.id,
        poster_image_url: result.poster_image_url,
        title: result.title,
        caption: result.caption,
        UserId: result.UserId,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {import('express').NextFunction} next
   */
  static async update(req, res, next) {
    try {
      const { photoId } = req.params;
      const { title, caption, poster_image_url } = req.body;
      const result = await Photo.update(
        { title, caption, poster_image_url },
        {
          where: { id: photoId },
          returning: true,
        }
      );
      console.log(result);
      if (result[0] === 0) {
        res.status(400).json({
          message: 'No photos updated',
        });
      } else {
        res.status(200).json({
          photo: result[1][0],
        });
      }
    } catch (error) {
      next(error);
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {import('express').NextFunction} next
   */
  static async delete(req, res, next) {
    try {
      const { photoId } = req.params;
      await Photo.destroy({ where: { id: photoId } });
      res
        .status(200)
        .json({ message: 'Your photo has been successfully deleted' });
    } catch (error) {
      next(error);
    }
  }

  static async authorize(req, res, next) {
    try {
      const { photoId } = req.params;
      const authenticatedUser = req.user.id;

      const photo = await Photo.findOne({
        where: {
          id: photoId,
        },
      });

      if (!photo) {
        res.status(404).json({
          name: 'Data Not Found',
          message: `Photo with id "${photoId}" not found`,
        });
      } else if (photo.UserId === authenticatedUser) {
        next();
      } else {
        res.status(403).json({
          name: 'Authorization Error',
          message: `User with id "${authenticatedUser}" does not have permission to access Photo with id "${photoId}"`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PhotoController;
