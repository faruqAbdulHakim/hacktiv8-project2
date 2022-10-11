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
    const { id } = req.params;
    const { title, caption, poster_image_url } = req.body;
    const data = { title, caption, poster_image_url };
    try {
      const result = await Photo.update(data, {
        where: { id },
        returning: true,
      });
      res.status(201).json(result);
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
    // TODO: create photo delete
  }
}

module.exports = PhotoController;
