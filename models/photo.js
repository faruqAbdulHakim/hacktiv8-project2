'use strict';
const { Model } = require('sequelize');

/**
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      Photo.belongsTo(models.User);
      Photo.hasMany(models.Comment);
    }
  }
  Photo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Title cannot be omittted',
          },
          notEmpty: {
            msg: 'Title cannot be an empty string',
          },
        },
      },
      caption: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Caption cannot be omitted',
          },
          notEmpty: {
            msg: 'Caption cannot be an empty string',
          },
        },
      },
      poster_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'Wrong Url format',
          },
          notNull: {
            msg: 'Poster Image URL cannot be omitted',
          },
          notEmpty: {
            msg: 'Poster Image URL cannot be an empty string',
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User ID cannot be omitted',
          },
          notEmpty: {
            msg: 'User ID cannot be an empty string',
          },
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
