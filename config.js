const path = require('path');
const config = require('kelp-config/config');

const root = process.cwd();

const defaults = {
  port: 3000,
  path: {
    root,
    public: path.join(root, 'public'),
    client: path.join(root, 'client'),
    server: path.join(root, 'server'),
    models: path.join(root, 'server/models'),
    plugins: path.join(root, 'server/plugins'),
    services: path.join(root, 'server/services'),
    templates: path.join(root, 'server/templates'),
    controllers: path.join(root, 'server/controllers'),
  },
  routes: [],
  plugins: [],
};

module.exports = config(defaults);
