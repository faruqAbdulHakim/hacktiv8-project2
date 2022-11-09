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
    const { socialMediaId } = req.params;
    const { name, social_media_url } = req.body;
    try {
      // Authorization
      const userCheck = await SocialMedia.findOne({
        where: { id: socialMediaId },
      });
      if (!userCheck) throw { name: 'SocialMediaNotFound' };
      if (userCheck.UserId != req.user.id) throw { name: 'Forbidden' };

      const socialMedia = await SocialMedia.update(
        { name, social_media_url },
        { where: { id: socialMediaId }, returning: true }
      );
      res.status(200).json({ social_media: socialMedia[1][0] });
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
    const { socialMediaId } = req.params;
    try {
      // Authorization
      const userCheck = await SocialMedia.findOne({
        where: { id: socialMediaId },
      });
      if (!userCheck) throw { name: 'SocialMediaNotFound' };
      if (userCheck.UserId != req.user.id) throw { name: 'Forbidden' };
      const socialMedia = await SocialMedia.destroy({
        where: { id: socialMediaId },
      });
      res
        .status(200)
        .json({ message: 'Social media has been successfully deleted' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SocialMediaController;
