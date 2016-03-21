var expect = require('expect.js');
var Talk = require('../lib/talk');

describe('Testing Talk functions', function() {

    it('should return the title of talk', function(done) {
        var toTest = 'Programming in the Boondocks of Seattle 30min';
        var talk = new Talk(toTest);
        expect(talk.title).to.equal('Programming in the Boondocks of Seattle');
        done();
    });

    it('should return the minutes of talk', function(done) {
        var toTest = 'User Interface CSS in Rails Apps 30min';
        var talk = new Talk(toTest);
        expect(talk.durationInMinutes).to.equal(30);
        done();
    });

    it('should return the minutes of lightning talk with 5 minutes', function(done) {
        var toTest = 'Rails for Python Developers lightning';
        var talk = new Talk(toTest);
        expect(talk.durationInMinutes).to.equal(5);
        done();
    });

    it('should throw Error while passing invalid talk format (not end with \'min\')', function(done) {
        var toTest = 'Ruby on Rails: Why We Should Move On 60mintest';
        expect(function(){new Talk(toTest)}).to.throwError();
        done();
    });

    it('should throw Error while passing invalid talk format (not end with \'lightning\')', function(done) {
        var toTest = 'Ruby on Rails: Why We Should Move On lightningtest';
        expect(function(){new Talk(toTest)}).to.throwError();
        done();
    });
});
