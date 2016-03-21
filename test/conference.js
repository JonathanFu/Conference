var expect = require('expect.js');
var Conference = require('../lib/conference');
var filePath = '../data/input.txt';

describe('Testing Conference functions', function() {

    var conference;
    before(function(){
        conference = new Conference();
    })

    it('should not throw error via correct file', function(done) {
        expect(function(){conference.setupConferenceSchedule(filePath)}).to.not.throwError();
        done();
    });

    it('should throw error via correct file', function(done) {
        expect(function(){conference.setupConferenceSchedule(filePath + 'invalid')}).to.throwError();
        done();
    });


});