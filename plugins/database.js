const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = (app, options) => {
  const { database = options } = app.config;
  if (typeof database !== 'object')
    throw new TypeError('[kelp-next] database must be an object');
  const db = new Sequelize(database);
  const { models: dir } = app.config.path;
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    db.models = files
      .map(file => path.join(dir, file))
      .reduce((models, filename) => {
        const Model = app.import(filename);
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