const glob = require('glob');
const Controller = require('../controller');

const convert = actions => {
  if(!Array.isArray(actions))
    return convert([ actions ]);
  return actions.reduce((controller, item, i) => {
    if(typeof item === 'object' && Object.keys(item).length === 0)
      throw new Error(`[kelp-next] controller is empty`);
    const { method = '*', url: path } = item;
    const action = 
      item.name || 
      path      ||
      item.controller && item.controller.name || 
      `action-${i}`;
    // obj like controller
    controller[action] = item.controller ? item.controller : item;
    controller.__routes.push({ method, path, action });
    return controller;
  }, { __routes: [] });
};

module.exports = app => {
  const { controllers: dir } = app.config.path;
  app.registerController = (name, ctrl) => {
    app.controllers = app.controllers || {};
    if (Array.isArray(ctrl.__routes)) {
      ctrl.__routes.forEach(route => {
        // because decorator can NOT get their filename name.
        route.controller = name;
        // when `route.path` is undefined, defaults to
        // controller name and action name
        if (route.path === undefined) {
          route.path = `/${route.controller}/${route.action}`;
        }
        // console.log(route.path);
        return app.registerRoute(route);
      });
    }
    return app.controllers[name] = ctrl;
  };
  // controllers
  app.loadController = filename => {
    var controller = app.import(filename);
    if(controller.__proto__ === Controller){
      controller = new controller(app);
    }else if(typeof controller === 'function'){
      controller = convert(controller);
    } else if(Array.isArray(controller)){
      controller = convert(controller);
    }else if(typeof controller === 'object'){
      controller = convert(controller);
    }else{
      throw new TypeError(`[kelp-next] controller must be a function at ${filename}`);
    }
    const name = filename.replace(`${dir}/`, '').replace(/\..+$/, '');
    return app.registerController(name, controller);
  };
  glob(`${dir}/**/*.js`, (err, files) => {
    if(err) return console.error('[kelp-next] load controller error:', err);
    files.forEach(filename => app.loadController(filename));
  });
  return async (req, res, next) => {
    if (!req.route) return next();
    const controller = app.controllers[req.route.controller];
    if (!controller) throw new Error('[kelp-next] controller not found');
    const action = controller[req.route.action];
    if (!action) throw new Error('[kelp-next] action not found');
    res.scope = await res.invoke(action, controller);
    return next();
  }
};