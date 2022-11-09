require('./check');
require('./babel');
require('./alias');

const createApp = require('.');
createApp().then(app => app.start());