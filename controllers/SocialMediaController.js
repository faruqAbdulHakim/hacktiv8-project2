const { SocialMedia, User } = require('./../models/index');

class SocialMediaController {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {import('express').NextFunction} next
   */
  static async findAll(req, res, next) {
    try {
      const socialMedias = await SocialMedia.findAll({
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
      res.status(200).json({ social_medias: socialMedias });
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
      const { name, social_media_url } = req.body;
      const UserId = req.user.id;
      const result = await SocialMedia.create({
        name,
        social_media_url,
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
    try {
      const { socialMediaId } = req.params;
      const { name, social_media_url } = req.body;
      if (!name || !social_media_url) throw { name: 'BadRequest' };

      const result = await SocialMedia.update(
        { name, social_media_url },
        { where: { id: socialMediaId }, returning: true }
      );
      if (result[0] === 0) {
        res.status(400).json({ message: 'No Social Media updated' });
      } else {
        res.status(200).json({ social_media: result[1][0] });
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
      const { socialMediaId } = req.params;
      await SocialMedia.destroy({ where: { id: socialMediaId } });
      res
        .status(200)
        .json({ message: 'Your social media has been successfully deleted' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {import('express').NextFunction} next
   */
  static async authorize(req, res, next) {
    try {
      const { socialMediaId } = req.params;
      const socialMedia = await SocialMedia.findOne({
        where: { id: socialMediaId },
      });
      if (!socialMedia) {
        res.status(404).json({
          name: 'Data Not Found',
          message: `SocialMedia with id "${socialMediaId}" not found`,
        });
      } else if (socialMedia.UserId === req.user.id) {
        next();
      } else {
        res.status(403).json({
          name: 'Authorization Error',
          message: `User with id "${req.user.id}" does not have permission to access SocialMedia with id "${socialMediaId}"`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SocialMediaController;
