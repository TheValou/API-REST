var sequelize = require('../config/sequelize').sequelize;
var DataTypes = require('sequelize/lib/data-types');
var Sequelize = require('sequelize');

var User = sequelize.define('user', {
  lastname: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.ENUM('super', 'admin')
  }

}, {
    tableName: 'user',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
User.sync();

module.exports = User;