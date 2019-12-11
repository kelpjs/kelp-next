const { join } = require('path');
const config = require('kelp-config/config');

const root = process.cwd();
const $ = p => join(root, p);

const defaults = {
  port: 3000,
  path: {
    root,
    public: $('public'),
    client: $('client'),
    server: $('server'),
    models: $('server/models'),
    plugins: $('server/plugins'),
    services: $('server/services'),
    templates: $('server/templates'),
    controllers: $('server/controllers'),
  },
  routes: [],
  plugins: [],
};

module.exports = config(defaults);
