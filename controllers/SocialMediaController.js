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
    const { name, social_media_url } = req.body;
    const UserId = req.user.id;
    try {
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
    // TODO: create social media update
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {import('express').NextFunction} next
   */
  static async delete(req, res, next) {
    // TODO: create social media delete
  }
}

module.exports = SocialMediaController;
