const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

module.exports = (app, options) => {
  let url, servers;
  ({ url, servers, ...options } = Object.assign({}, app.config.mongodb, options));
  mongoose.connect(Array.isArray(servers) ? servers.join(',') : url, options);
  const { models: dir } = app.config.path;
  fs.readdirSync(dir)
    .map(file => path.join(dir, file))
    .reduce((models, filename) => {
      const M = app.import(filename);
      const schema = new mongoose.Schema(M.$schema);
      const Model = mongoose.model(M.name, schema);
      require.cache[filename].exports = Model; // a magic hack ...
      models[M.name] = Model;
      // https://mongoosejs.com/docs/advanced_schemas.html
      schema.loadClass(M);
      return models;
    }, {});
};