module.exports = (app, options) => {
  return async (req, res, next) => {
    await next();
    if(res.statusCode === 404){
      res.end('Not Found');
    }
  };
};