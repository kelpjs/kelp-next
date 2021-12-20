const kelp = require('kelp');
const config = require('./config');
const xmport = require('./import');

const loadMiddlewares = require('./core/plugin');
const loadControllers = require('./core/controller');

const { createServer } = require('kelp-server');

module.exports = async () => {
  const app = kelp();
  app.config = config;
  app.import = xmport;
  app.server = createServer({
    app,
    routes: config.routes,
    middlewares: await loadMiddlewares(app),
    controllers: await loadControllers(app),
  });
  app.start = (port = config.port) => {
    app.server.listen(port);
    return app;
  };
  return app;
};