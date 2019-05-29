const fs = require('fs');
const nunjucks = require('nunjucks');

module.exports = {
  extension: 'ejs',
  renderer: (filename, options = {}) => {
    const { encoding = 'utf8', templates } = options;
    const env = nunjucks.configure(templates, options);
    // const view = filename.replace(templates, '');
    const str = fs.readFileSync(filename, encoding);
    const fn = nunjucks.compile(str, env);
    return fn.render;
  }
};