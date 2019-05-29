require('./check');
require('./babel');
require('./alias');

const os = require('os');
const http = require('http');
const cluster = require('cluster');

const kelp = require('.');

const app = kelp();

const { config } = app;

let { workers } = config;
if (~[true, 0, 'auto'].indexOf(workers)) {
  const cpus = os.cpus();
  workers = cpus.length;
}

const start = () => {
  while (workers && Object.keys(cluster.workers).length < workers) {
    cluster.fork();
  }
};

cluster.on('online', worker => {
  console.log('[@kelpjs/next] cluster worker started', worker.id);
});

cluster.on('exit', (worker, code, signal) => {
  if (signal) {
    console.warn(`[@kelpjs/next] worker ${worker.id} was killed by signal: ${signal}`);
  } else if (code !== 0) {
    console.error(`[@kelpjs/next] worker ${worker.id} exited with error code: ${code}`);
    start();
  } else {
    console.log(`[@kelpjs/next] cluster worker ${worker.id} exited`);
  }
});

// cluster mode
if (cluster.isMaster) {
  cluster.setupMaster({
    exec: __filename
  });
  start();
}

const server = http.createServer(app);

if (!workers || cluster.isWorker) {
  server.listen(config.port, () => {
    console.log('[@kelpjs/next] server is running at %s', server.address().port);
  });
}

app.server = server;

module.exports = app;
