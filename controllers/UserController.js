const { User } = require('./../models/index');
const { hashPassword } = require('./../helpers/bcrypt');
const { comparePassword } = require('./../helpers/bcrypt');
const { sign } = require('./../helpers/jwtHelper');

class UserController {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {import('express').NextFunction} next
   */
  static async register(req, res, next) {
    try {
      const requiredProps = [
        'email',
        'full_name',
        'username',
        'password',
        'profile_image_url',
        'age',
        'phone_number',
      ];
      const body = {};
      for (const prop of requiredProps) {
        if (!req.body[prop]) throw { name: 'BadRequest' };
        body[prop] = req.body[prop];
      }

      const hashedPassword = hashPassword(body.password);
      const userCreated = await User.create({
        ...body,
        password: hashedPassword,
      });

      const user = { ...userCreated.dataValues };
      delete user['id'];
      delete user['password'];
      delete user['createdAt'];
      delete user['updatedAt'];
      res.status(201).json({
        user: user,
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
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: 'userNotFound' };

      if (!comparePassword(password, user.password))
        throw { name: 'WrongPassword' };

      const token = sign({
        id: user.id,
        email: user.email,
      });
      res.status(200).json({ token });
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
      const { userId } = req.params;
      // authorize
      if (userId != req.user.id) throw { name: 'Forbidden' };

      const requiredProps = [
        'email',
        'full_name',
        'username',
        'profile_image_url',
        'age',
        'phone_number',
      ];
      const body = {};
      for (const prop of requiredProps) {
        if (!req.body[prop]) throw { name: 'BadRequest' };
        body[prop] = req.body[prop];
      }

      const userUpdated = await User.update(body, {
        where: { id: userId },
        returning: true,
      });

      const user = { ...userUpdated[1][0].dataValues };
      delete user['id'];
      delete user['password'];
      delete user['createdAt'];
      delete user['updatedAt'];

      res.status(200).json({ user });
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
      const { userId } = req.params;
      // authorize
      if (userId != req.user.id) throw { name: 'Forbidden' };

      await User.destroy({ where: { id: userId } });
      res
        .status(200)
        .json({ message: 'Your account has been successfully deleted' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
