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
		const { email, full_name, username, password, profile_image_url, age, phone_number } = req.body;
		try {
			const hashPass = hashPassword(password);
			const user = await User.create({ email, full_name, username, password: hashPass, profile_image_url, age, phone_number });
			res.status(201).json({
				message: 'Success',
				user: { email, full_name, username, profile_image_url, age, phone_number },
			});
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
	static async login(req, res, next) {
		// TODO: create user login
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {import('express').NextFunction} next
	 */
	static async update(req, res, next) {
		// TODO: create user update
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {import('express').NextFunction} next
	 */
	static async delete(req, res, next) {
		// TODO: create user delete
	}
}

module.exports = UserController;
