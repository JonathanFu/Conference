var expect = require('expect.js');
var Track = require('../lib/track');
var Talk = require('../lib/talk');

describe('Testing Track functions', function() {

    var track;
    before(function(){
        track = new Track();
    })

    it('should return the morning time', function(done) {
        expect(track.timeToString()).to.equal('09:00AM ');
        done();
    });

    it('should return the update time', function(done) {
        var talkList = [];
        talkList.push(new Talk('Accounting­Driven Development 45min'));
        talkList.push(new Talk('Communicating Over Distance 60min'));
        track.assembleTracks(talkList);
        track.updateTime(5);
        expect(track.timeToString()).to.equal('11:50AM ');
        done();
    });

});