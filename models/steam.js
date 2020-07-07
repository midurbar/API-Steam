const Sequelize = require('sequelize');
const sequelize =require ('./db');

const Steam = sequelize.define('steam', {
    codigo:{type: Sequelize.INTEGER, primaryKey: true},
    nombre: Sequelize.STRING,
    tipo: Sequelize.STRING,
    precio: Sequelize.DECIMAL(2,3)
});
  module.exports = Steam;