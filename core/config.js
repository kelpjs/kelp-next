const config = require('../config');

module.exports = app => {
  app.config = config;
  return (req, res, next) => next();
};