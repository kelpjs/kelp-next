const NOT_FOUND = 404;

module.exports = (app, options) => {
  return async (req, res, next) => {
    await next();
    const { statusCode } = res;
    if(statusCode === NOT_FOUND) {
      res.writeHead(statusCode);
      res.end();
    }
  };
};