const serve = require('kelp-static');

module.exports = (app, root, options) => {
  root = root || app.config.path.public;
  return serve(root, options);
};