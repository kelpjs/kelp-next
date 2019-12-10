
module.exports = app => {
  return async (req, res, next) => {
    res.scope !== void(0) && res.send(res.scope);
    return next();
  };
};
