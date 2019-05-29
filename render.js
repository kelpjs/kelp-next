const path = require('path');
const config = require('./config');
const Import = require('./import');
const render = require('kelp-render/render');

const cache = new Map();
const { templates } = config.path;

const defaultOptions = {
  cache,
  renderer: 'default',
  templates,
  extension: '',
};

const createEngine = name => {
  if(typeof name === 'function')
    return { renderer: name };
  return Import(name, [
    path.join(__dirname, './renders')
  ]);
};

const createRender = options => {
  if(typeof options === 'string')
    options = { renderer: options };
  options = Object.assign({}, defaultOptions, options);
  const engine = createEngine(options.renderer);
  options = Object.assign({}, options, engine);
  return render(options);
};

module.exports = createRender(config.render);