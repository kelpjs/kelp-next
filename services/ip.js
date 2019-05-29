const IPReg = /\d+.\d+.\d+.\d+/;

module.exports = (req, headers) => {
  return [
    headers['x-real-ip'],
    headers['x-forwarded-for'],
    req.connection.remoteAddress,
    '127.0.0.1'
  ]
    .filter(Boolean)
    .filter(ip => IPReg.test(ip))
    .map(ip => IPReg.exec(ip)[0])[0];
};