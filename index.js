const kelp = require('kelp');
const send = require('kelp-send');
const config = require('./core/config');
const router = require('./core/router');
const plugin = require('./core/plugin');
const service = require('./core/service');
const responder = require('./core/responder');
const controller = require('./core/controller');

module.exports = () => {
  const app = kelp();
  app.use(send);
  app.use(config(app));
  app.use(router(app));
  app.use(service(app));
  app.use(plugin(app));
  app.use(controller(app));
  app.use(responder(app));
  return app;
};
