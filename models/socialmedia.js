'use strict';
const { Model } = require('sequelize');

/**
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
	class SocialMedia extends Model {
		static associate(models) {
			SocialMedia.belongsTo(models.User);
		}
	}
	SocialMedia.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			social_media_url: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
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
			modelName: 'SocialMedia',
		}
	);
	return SocialMedia;
};
