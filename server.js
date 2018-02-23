const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const proxy = require('./lib/proxy-router');

const server = express();
server.use(bodyParser.json());

const config = require('./config');

server.get('/', (req, res) => proxy(req, res, request));

server.listen(config.port);