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
      const {
        email,
        full_name,
        username,
        password,
        profile_image_url,
        age,
        phone_number,
      } = req.body;
      if (
        !email ||
        !full_name ||
        !username ||
        !password ||
        !profile_image_url ||
        !age ||
        !phone_number
      )
        throw { message: 'BadRequest' };

      const hashedPassword = hashPassword(password);
      const createdUser = await User.create({
        email,
        full_name,
        username,
        password: hashedPassword,
        profile_image_url,
        age,
        phone_number,
      });

      const user = { ...createdUser.dataValues };
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
      if (!email || !password) throw { name: 'BadRequest' };
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
      const {
        email,
        full_name,
        username,
        profile_image_url,
        age,
        phone_number,
      } = req.body;
      if (
        !email ||
        !full_name ||
        !username ||
        !profile_image_url ||
        !age ||
        !phone_number
      )
        throw { name: 'BadRequest' };

      const updatedUser = await User.update(
        { email, full_name, username, profile_image_url, age, phone_number },
        {
          where: { id: req.params.userId },
          returning: true,
        }
      );

      const user = { ...updatedUser[1][0].dataValues };
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
      await User.destroy({ where: { id: userId } });
      res
        .status(200)
        .json({ message: 'Your account has been successfully deleted' });
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
      const { userId } = req.params;
      if (userId != req.user.id) throw { name: 'Forbidden' };
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
