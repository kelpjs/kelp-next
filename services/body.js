const parse = require('kelp-body');

module.exports = req =>
  new Promise((resolve, reject) => {
    parse(req, null, err => {
      if (err) return reject(err);
      resolve(req.body);
    });
  });