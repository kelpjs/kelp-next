const kelp = require('kelp');
const send = require('kelp-send');
const config = require('./core/config');
const router = require('./core/router');
const service = require('./core/service');
const responder = require('./core/responder');
const controller = require('./core/controller');
const middleware = require('./core/middleware');

module.exports = () => {
  const app = kelp();
  app.use(send);
  app.use(config(app));
  app.use(router(app));
  app.use(service(app));
  app.use(middleware(app));
  app.use(controller(app));
  app.use(responder(app));
  return app;
};
