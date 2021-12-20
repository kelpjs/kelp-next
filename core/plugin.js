const path = require('path');

module.exports = (app) => {
  const { plugins, middleware } = app.config;
  const mws = plugins.map(plugin => {
    let name, args = [];
    if (typeof plugin === 'string')
      name = plugin;
    if (Array.isArray(plugin))
      [name, ...args] = plugin;
    name && (plugin = app.import(name, [
      app.config.path.plugins,
      path.join(__dirname, '../plugins')
    ]));
    return plugin.apply(app, [app].concat(args));
  }).filter(mw => typeof mw === 'function');
  return mws.concat(middleware);
};