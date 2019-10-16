const AWS = require('aws-sdk');

module.exports = (app, options) => {
  const { endpoint, accessKey, secretKey } = options;
  app.s3 = new AWS.S3({
    endpoint,
    accessKeyId: accessKey,
    secretAccessKey: secretKey
  });
  return (req, res, next) => {
    req.s3 = app.s3;
    res.s3 = app.s3;
    return next();
  };
};
