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
      res.status(200).json({ Photos: photos });
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
    const { title, caption, poster_image_url } = req.body;
    const UserId = req.user.id;
    try {
      const result = await Photo.create({
        title,
        caption,
        poster_image_url,
        UserId,
      });
      res.status(201).json(result);
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
    const { photoId } = req.params;
    const { title, caption, poster_image_url } = req.body;
    try {
      const result = await Photo.update(
        { title, caption, poster_image_url },
        {
          where: { id: photoId },
          returning: true,
        }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {import('express').NextFunction} next
   */
  static async delete(req, res, next) {
    const { photoId } = req.params;
    try {
      const result = await Photo.destroy({ where: { id: photoId } });
      res
        .status(200)
        .json({ message: 'Your photo has been successfully deleted' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PhotoController;
