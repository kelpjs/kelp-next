const xfind = require('xfind');

module.exports = async (app) => {
  const { controllers: dir } = app.config.path;
  const files = await xfind.collect(`${dir}/**/*.js`);
  return files.map(filename => app.import(filename));
};