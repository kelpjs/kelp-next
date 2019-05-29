const fs = require('fs');
const path = require('path');
const injector = require('inject2');
const Import = require('../import');

module.exports = app => {
  const { services = {} } = app.config;
  const { services: dir } = app.config.path;
  app.import = Import;
  app.services = services;
  app.registerService = (name, service) => {
    app.services[name] = service;
    return service;
  };
  app.loadService = filename => {
    const name = path.basename(filename).replace(/\..+$/, '');
    const service = app.import(filename);
    return app.registerService(name, service);
  };
  const readdir = dir => new Promise(resolve => {
    fs.readdir(dir, (err, files) => {
      resolve(err ? [] : files.map(f => path.join(dir, f)));
    });
  });
  Promise
  .all([
    readdir(path.join(__dirname, '../services')),
    readdir(dir)
  ])
  .then(files => [].concat.apply([], files))
  .then(files => files.forEach(app.loadService.bind(app)))
  return async (req, res, next) => {
    res.invoke = injector(Object.assign({
      // ...
    }, app.services, { req, res }));
    return next();
  };
};