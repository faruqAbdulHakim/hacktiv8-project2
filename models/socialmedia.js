'use strict';
const { Model } = require('sequelize');

/**
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    static associate(models) {}
  }
  SocialMedia.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      social_media_url: {
        type: DataTypes.STRING,
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SocialMedia',
    }
  );
  return SocialMedia;
};
