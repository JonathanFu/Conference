var expect = require('expect.js');
var Session = require('../lib/session');
var Talk = require('../lib/talk');

describe('Testing Session functions', function() {

    var session;
    before(function(){
        session = new Session([], "morning");
    })

    it('should return the morning minutes', function(done) {
        expect(session.durationInMinutes).to.equal(180);
        done();
    });

    it('should return the morning session', function(done) {
        var talk = new Talk("Accounting­Driven Development 45min");
        session.addEventTalk(talk);
        expect(session.events[0]).to.equal(talk);
        done();
    });

    it('should return full status of morning sessions', function(done) {

        var talk1 = new Talk("Common Ruby Errors 45min");
        var talk2 = new Talk("Communicating Over Distance 60min");
        var talk3 = new Talk("Accounting­Driven Development 45min");
        var talk4 = new Talk("Sit Down and Write 30min");
        session.addEventTalk(talk1);
        session.addEventTalk(talk2);
        session.addEventTalk(talk3);
        session.addEventTalk(talk4);

        expect(session.checkSessionStatus()).to.equal(true);
        done();
    });

    it('should return updated count of morning sessions', function(done) {

        var talk1 = new Talk("Common Ruby Errors 45min");
        var talk2 = new Talk("Communicating Over Distance 60min");
        var talk3 = new Talk("Accounting­Driven Development 45min");
        session.addEventTalk(talk1);
        session.addEventTalk(talk2);
        session.addEventTalk(talk3);

        var talk4 = new Talk("Sit Down and Write 30min");
        var talk5 = new Talk("User Interface CSS in Rails Apps 30min");
        session.updateTalkList([talk4, talk5]);

        expect(session.events.length).to.equal(2);
        done();
    });
});