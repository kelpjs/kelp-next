const { METHODS } = require('http');
const Router = require('./core/router');

Router.route = (method = '*', path = '/', options = {}) => {
  return (controller, action) => {
    controller.__routes = controller.__routes || [];
    controller.__routes.push({
      method, path, action, options
    });
  };
};

// alias
METHODS.forEach(method => {
  Router[method.toLowerCase()] = Router.route.bind(null, method);
});

Router.all = Router.route.bind(null, null);
Router.restful = (path, options) => {
  const methods = {
    get: 'index',
    put: 'update',
    post: 'create',
    delete: 'remove'
  };
  return target => {
    path = (path || `/${target.name}`).toLowerCase();
    path += '/:id?';
    target.prototype.__routes = target.prototype.__routes || [];
    Object.keys(methods).forEach(method => {
      target.prototype.__routes.push({
        method, path, action: methods[method], options
      });
    });
  };
};

/**
 * prefix
 */
Router.prefix = (prefix = '') => {
  if (typeof prefix !== 'string')
    throw new TypeError(`[kelp-next] "prefix" must a string, but got a "${typeof prefix}".`)
  return ctrl => {
    if (!ctrl.prototype.__routes)
      throw new Error(`[kelp-next] controller "${ctrl.name}" haven't set router yet, you may need to call functions like "@get", "@post", "@restfull".`);
    ctrl.prototype.__routes.forEach(route => {
      route.path = prefix + route.path;
    });
  };
};

module.exports = Router;
