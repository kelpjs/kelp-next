const fs = require('fs');
const { promisify } = require('util');
const nunjucks = require('nunjucks');

const readFile = promisify(fs.readFile);

module.exports = {
  extension: 'njk',
  renderer: async (filename, options = {}) => {
    const { encoding = 'utf8', templates } = options;
    const env = nunjucks.configure(templates, options);
    const str = await readFile(filename, encoding);
    const fn = nunjucks.compile(str, env, filename);
    return fn.render.bind(fn);
  }
};