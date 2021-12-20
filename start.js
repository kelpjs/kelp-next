require('./check');
require('./babel');
require('./alias');

const createApp = require('.');

(async () => {
    const app = await createApp();
    app.start();
})();