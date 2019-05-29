const { METHODS } = require('http')
const routing = require('routing2');

const Router = app => {
  const { routes: rules } = app.config;
  app.routes = app.routes || [];
  app.router = METHODS.reduce((api, method) => {
      // app.router.get('/').to('home', 'index');
      api[method.toLowerCase()] = path => {
        return {
          to: (controller, action) => {
            app.registerRoute({ method, path, controller, action });
          }
        };
      };
      return api;
    }, {});
  app.registerRoute = route => {
    if (typeof route === 'string')
      route = routing.parseLine(route);
    app.routes.push(routing.create(route));
    return route;
  };
  // routes
  rules.forEach(app.registerRoute.bind(app));
  return async (req, res, next) => {
    const { status, route } = routing.find(app.routes, req);
    res.statusCode = status;
    req.route = route;
    await next();
  };
};

module.exports = Object.assign(Router, routing);