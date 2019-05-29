const path = require('path');

const { 
  CONFIG_DIR = 'config',
  NODE_ENV = 'development'
} = process.env;

const root = process.cwd();

const defaults = {
  port: 3000,
  path: {
    root,
    public: path.join(root, 'public'),
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

module.exports =  [
  'default',
  NODE_ENV,
  'local'
].reduce((config, conf) => {
  let filename;
  try{
    filename = require.resolve(path.join(root, CONFIG_DIR, conf));
  }catch(e){}
  filename && Object.assign(config, require(filename));
  return config;
}, defaults);
