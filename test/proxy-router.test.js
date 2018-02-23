const mocha = require('mocha');
const assert = require('assert');
const proxy = require('../lib/proxy-router');

// \/\w+

describe('proxy router', () => {
    const res = { send: () => {} };

    describe('GET', () => {
        describe('when an endpoint is defined', () => {
            const req = {
                url: '/events/12345',
                method: 'GET'
            };
            it('should proxy the request to the correct url', (done) => {
                const mockRequest = {
                    get: (url) => {
                        assert.strictEqual(url, 'http://events-api:3000/12345');
                        done();
                    }
                };
                proxy(req, res, mockRequest);
            });
        });

        describe('when the endpoint is /', () => {
            const req = {
                url: '/teams',
                method: 'GET'
            };
            it('should proxy the request to the correct url', () => {
                const mockRequest = {
                    get: (url) => {
                        assert.strictEqual(url, 'http://team-api:3000');
                    }
                };
                proxy(req, res, mockRequest);
            });
        });
    });
});