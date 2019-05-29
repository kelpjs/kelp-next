const path = require('path');
const config = require('kanary/config');
const Import = require('./import');

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
  const { renderer } = options;
  return async (view, state, opts) => {
    opts = Object.assign({}, options, opts);
    const { templates, extension, cache } = opts;
    const filename = path.join(templates, view + (extension && `.${extension}`));
    var render = cache && cache.get(filename);
    if(!render) {
      render = renderer(filename, opts);
      cache && cache.set(filename, render);
    }
    return render(state);
  };
};

module.exports = createRender(config.render);