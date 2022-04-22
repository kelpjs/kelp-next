const kelp = require('kelp');
const xfind = require('xfind');
const config = require('./config');
const xmport = require('./import');
const Injector = require('inject2');

const loadMiddlewares = require('./core/plugin');
const loadControllers = require('./core/controller');

const { createServer } = require('kelp-server');

module.exports = async () => {

  const app = kelp();
  app.config = config;
  app.import = xmport;

  const p = `${__dirname}/services`;
  const files = await xfind.collect(`${p}/*.js`);
  const services = files.reduce((services, filename) => {
    const name = filename.replace(p + '/', '').replace(/\.js$/, '');
    services[name] = xmport(filename);
    return services;
  }, {});
  const serviceInvoke = action => {
    return async (req, res, next) => {
      const invoke = Injector({
        ...services,
        req,
        res,
      });
      const result = await invoke(action);
      res.send(result);
    };
  };
  app.server = createServer({
    app,
    invoke: serviceInvoke,
    routes: config.routes,
    middlewares: await loadMiddlewares(app),
    controllers: await loadControllers(app),
    defaultHandler: true,
  });
  app.start = (port = config.port) => {
    app.server.listen(port);
    return app;
  };
  return app;
};