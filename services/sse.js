const SSE = require('server-send-events');

module.exports = (req, res) => 
    new SSE.Client(req, res);