const config = require('../config');

const getUrl = (host, port, endpoint) => `http://${host}:${port}${endpoint}`;

module.exports = function proxy(req, res, request) {
    const method = req.method.toLowerCase();
    const endpoint = req.url.replace(/\/\w+/, '');
    const apiPath = req.url.match(/\/\w+/)[0];
    const apiName = apiPath.slice(1, apiPath.length);
    const api = config.apis[apiName];

    const url = getUrl(api.host, api.port, endpoint);

    request[method](url, (error, response) => {
        if (error) {
            res.send(error);
        } else {
            res.send(response.body);
        }
    });
}