'use strict';
const { Model } = require('sequelize');

/**
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {}
  }
  Photo.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      caption: {
        type: DataTypes.TEXT,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      poster_image_url: {
        type: DataTypes.TEXT,
        validate: {
          isUrl: true,
          notNull: true,
          notEmpty: true,
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
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
