const { parse } = require('kelp-cookie');

module.exports = headers => {
  const { cookie } = headers;
  return parse(cookie);
}