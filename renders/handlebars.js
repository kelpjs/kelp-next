const fs = require('fs');
const { promisify } = require('util');
const Handlebars = require('handlebars');

const readFile = promisify(fs.readFile);

module.exports = {
  extension: 'hbs',
  renderer: async (filename, options = {}) => {
    const { encoding = 'utf8' } = options;
    const str = await readFile(filename, encoding);
    return Handlebars.compile(str, options);
  }
};