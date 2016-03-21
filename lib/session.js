
var TIME = require('./constants').TIME;

function Session(talks, sessionTime) {
    this.durationInMinutes;
    this.events = talks;
    this.setSessionDuration(sessionTime);
}

Session.prototype.setSessionDuration = function(time) {
    if (time === TIME.MORNING) {
        this.durationInMinutes = 180;
    } else {
        this.durationInMinutes = 240;
    }
};

Session.prototype.addEventTalk = function(unlistedTalk) {
    if (this.checkSessionCapacity(unlistedTalk)) {
        this.events.push(unlistedTalk);
        this.durationInMinutes -= unlistedTalk.durationInMinutes;
    } else if (this.checkSessionStatus()) {
       // console.log("Session is full.");
    }
};

Session.prototype.checkSessionCapacity = function(unlistedTalk) {
    if (this.durationInMinutes < unlistedTalk.durationInMinutes) {
        return false;
    } else {
        return true;
    }
};

Session.prototype.updateTalkList = function(updatedTalks) {
    this.events = updatedTalks;
};

Session.prototype.checkSessionStatus = function() {
    if (this.durationInMinutes === 0) {
        return true;
    } else {
        return false;
    }

};

Session.prototype.getEventList = function() {
    return this.events;
};

exports = module.exports = Session;