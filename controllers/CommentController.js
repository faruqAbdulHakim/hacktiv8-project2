const { Comment, Photo, User } = require('./../models/index');

class CommentController {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {import('express').NextFunction} next
   */
  static async findAll(req, res, next) {
    try {
      const comments = await Comment.findAll({
        attributes: {
          exclude: ['PhotoId', 'UserId'],
        },
        include: [
          {
            model: Photo,
            attributes: ['id', 'title', 'caption', 'poster_image_url'],
          },
          {
            model: User,
            attributes: ['id', 'username', 'profile_image_url', 'phone_number'],
          },
        ],
      });
      res.status(200).json({ comments: comments });
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
    const { comment, PhotoId } = req.body;
    const UserId = req.user.id;
    try {
      const result = await Comment.create({
        comment,
        PhotoId,
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
    // TODO: create comment update
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {import('express').NextFunction} next
   */
  static async delete(req, res, next) {
    // TODO: create comment delete
  }
}

module.exports = CommentController;
