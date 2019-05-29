require('./check');
require('./babel');
require('./alias');

const http = require('http');
const kelp = require('.');

const app = kelp();
const { config } = app;
const server = http.createServer(app);
server.listen(config.port, () => {
  console.log('[kelp-next] server is running at %s', server.address().port);
});

module.exports = server;