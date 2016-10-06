var Sequelize = require('sequelize');

var sequelize = new Sequelize('tcm_rest', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

exports.sequelize = sequelize;