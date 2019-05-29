const jade = require('jade');

module.exports = {
  extension: 'jade',
  renderer: jade.compileFile
};