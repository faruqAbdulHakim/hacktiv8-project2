'use strict';
const { Model } = require('sequelize');

/**
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {}
  }
  Comment.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      PhotoId: {
        type: DataTypes.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      comment: {
        type: DataTypes.TEXT,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
