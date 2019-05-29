const createRender = require('kelp-render');

module.exports = app => {
  const { render } = app.config;
  return createRender(render);
};