'use strict';
const { Model } = require('sequelize');

/**
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
          notNull: true,
          notEmpty: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      profile_image_url: {
        type: DataTypes.TEXT,
        validate: {
          isUrl: true,
          notNull: true,
          notEmpty: true,
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          notNull: true,
          notEmpty: true,
        },
      },
      phone_number: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
