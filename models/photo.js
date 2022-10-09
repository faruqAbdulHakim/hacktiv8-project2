'use strict';
const { Model } = require('sequelize');

/**
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
	class Photo extends Model {
		static associate(models) {
			Photo.belongsTo(models.User);
		}
	}
	Photo.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			caption: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			poster_image_url: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					isUrl: true,
					notNull: true,
					notEmpty: true,
				},
			},
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
		},
		{
			sequelize,
			modelName: 'Photo',
		}
	);
	return Photo;
};
