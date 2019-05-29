const url = require('url');

module.exports = req => 
  url.parse(req.url, true).query;