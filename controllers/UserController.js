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
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: 'userNotFound' };

      if (!comparePassword(password, user.password))
        throw { name: 'WrongPassword' };

      const token = sign({
        id: user.id,
        email: user.email,
      });
      res.status(200).json({ message: 'Success You are login', token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {import('express').NextFunction} next
   */
  static async update(req, res, next) {
    const { userId } = req.params;
    const { email, full_name, username, profile_image_url, age, phone_number } =
      req.body;
    try {
      const user = await User.update(
        { email, full_name, username, profile_image_url, age, phone_number },
        { where: { id: userId }, returning: true }
      );
      res.status(200).json({ message: 'Success', data: user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {import('express').NextFunction} next
   */
  static async delete(req, res, next) {
    const { userId } = req.params;
    try {
      const user = await User.destroy({ where: { id: userId } });
      res.status(200).json({ message: 'Success Destroy' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
