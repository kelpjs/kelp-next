const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = app => {
  const { database } = app.config;
  if(typeof database !== 'object') 
    throw new TypeError('[kelp-next] database must be an object');
  const db = new Sequelize(database);
  const DIR_MODELS = path.resolve('./server/models');
  fs.readdir(DIR_MODELS, (err, files) => {
    if (err) throw err;
    db.models = files.reduce((models, filename) => {
      // eslint-disable-next-line
      const Model = require(`${DIR_MODELS}/${filename}`);
      Model.init(Model.$schema, {
        sequelize: db
      });
      models[Model.name] = Model;
      return models;
    }, {});
    Object.keys(db.models).forEach(name => {
      if ('associate' in db.models[name]) {
        db.models[name].associate(db.models);
      }
    });
    db.sync();
  });
};