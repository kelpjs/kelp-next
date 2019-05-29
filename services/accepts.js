const Negotiator = require('negotiator');

module.exports = req => {
  const negotiator = new Negotiator(req);
  return {
    negotiator,
    types: negotiator.mediaTypes(),
    encodings: negotiator.encodings(),
    languages: negotiator.languages(),
  };
}