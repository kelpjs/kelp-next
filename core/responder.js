
module.exports = app => {
  return async (req, res, next) => {
    res.send(res.scope);
    return next();
  };
};
