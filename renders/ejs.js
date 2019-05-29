const fs = require('fs');
const ejs = require('ejs');

module.exports = {
  extension: 'ejs',
  renderer: (filename, options = {}) => {
    const { encoding = 'utf8' } = options;
    const str = fs.readFileSync(filename, encoding);
    return ejs.compile(str, options);
  }
};