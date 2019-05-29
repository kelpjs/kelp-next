const render = require('../render');

module.exports = (app, options) => {
  return async (req, res, next) => {
    res.render = async (view, state, opts) => {
      const data = Object.assign({}, req.locals, state);
      const body = await render(view, data, opts);
      if (typeof body !== 'string')
        throw new TypeError(`[kelp-next] renderer must return a string`);
      res.end(body);
    };
    return next();
  };
};
