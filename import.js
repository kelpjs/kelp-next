const Module = require('module');

const Import = (name, paths = module.paths) => {
  // https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js#L597
  const filename = Module._findPath(name, paths);
  if (!filename) {
    const err = new Error(`Cannot find module '${name}'`);
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  }
  const mod = require(filename);
  return mod.__esModule ? mod.default : mod;
};

module.exports = Import;