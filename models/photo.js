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
      },
      caption: {
        type: DataTypes.TEXT,
      },
      poster_image_url: {
        type: DataTypes.TEXT,
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Photo',
    }
  );
  return Photo;
};
