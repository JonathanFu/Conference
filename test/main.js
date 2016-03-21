var request = require('request');
var expect = require('expect.js');
var url = 'http://localhost:3000/';
var filePath = '../data/input.txt';

describe('Testing Main HTTP Request functions', function() {

    it('should return the OK response', function(done) {
        request.post({url: url, json: {filePath:filePath}}, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(JSON.stringify(response.body)).to.equal('{"res":"OK"}');
            done();
        });
    });

    it('should return 400 error while sending empty data', function(done) {
        request.post({url:url, json: ''}, function(error, response, body) {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.equal('{"error":"Could not decode request: JSON parsing failed"}');
            done();
        });
    });

    it('should return 400 error while sending invalid format data', function(done) {
        request.post(url, {'test':'test'}, function(error, response, body) {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.equal('{"error":"Could not decode request: JSON parsing failed"}');
            done();
        });
    });

    it('should return 500 error while sending invalid data', function(done) {
        request.post({url:url, json: {filePath: 'invalidpath'}}, function(error, response, body) {
            expect(response.statusCode).to.equal(500);
            done();
        });
    });

});
