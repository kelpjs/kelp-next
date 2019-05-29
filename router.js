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
  Router[ method.toLowerCase() ] = Router.route.bind(null, method);
});

module.exports = Router;
