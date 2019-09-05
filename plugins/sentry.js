const Sentry = require('node-sentry');

module.exports = (app, options) => {
  const sentry = app.sentry = new Sentry(options);
  return async (req, res, next) => {
    req.sentry = app.sentry;
    res.sentry = app.sentry;
    try {
      await next();
    } catch(err) {
      sentry.captureException(err);
    }
  };
};