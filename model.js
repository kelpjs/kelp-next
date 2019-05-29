const Sequelize = require('sequelize');

class Model extends Sequelize.Model {
  static get TYPES(){
    return Sequelize;
  }
}

module.exports = Model;
