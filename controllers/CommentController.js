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
        where: { UserId: req.user.id },
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
    const { commentId } = req.params;
    const { comment } = req.body;
    try {
      const checkUserid = await Comment.findOne({
        where: { id: commentId },
      });
      if (!checkUserid) throw { name: 'CommentNotFound' };
      if (checkUserid.UserId != req.user.id) throw { name: 'Forbidden' };
      const commentUpdate = await Comment.update(
        { comment },
        { where: { id: commentId }, returning: true }
      );
      res.status(200).json({ comment: commentUpdate[1][0] });
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
    const { commentId } = req.params;
    try {
      const checkUserid = await Comment.findOne({ where: { id: commentId } });
      if (!checkUserid) throw { name: 'CommentNotFound' };
      if (checkUserid.UserId != req.user.id) throw { name: 'Forbidden' };
      const deleteComment = await Comment.destroy({ where: { id: commentId } });
      res
        .status(200)
        .json({ message: 'Your comment has been successfully deleted' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
