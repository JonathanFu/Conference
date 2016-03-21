var Session = require('./session');
var TIME = require('./constants').TIME;

function Track(originalTalks){
    this.hours = 9;
    this.minutes = 0;
    this.period = TIME.AM;
    this.eventsInTrack = [];
    this.talkList;
    this.assembleTracks(originalTalks || []);
}

Track.prototype.assembleTracks = function(talks){
    if(talks.length === 0){
        return;
    }

    this.talkList = orderTalksByDuration(talks);
    this.configSessionToTrack(this.talkList, TIME.MORNING);
    this.configLunchToTrack();
    this.configSessionToTrack(this.talkList, TIME.AFTERNOON);
    this.configNetworkingEventToTrack();
};

Track.prototype.configSessionToTrack = function (talksInSession, sessionSegment) {
    var session = new Session(talksInSession, sessionSegment);
    talksInSession = this.sortTalksForSessionFormat(session, talksInSession);

    session.updateTalkList(talksInSession);
    this.addSessionToTrack(session);
};

Track.prototype.sortTalksForSessionFormat = function(sessionToSortFor, talksToBeSorted) {
    var talksAllocatedForSession = [];
    var minutesToBeAllocated = sessionToSortFor.durationInMinutes;

    if (minutesToBeAllocated !== 0) {
        for (var i = 0; i < talksToBeSorted.length; i++) {
            var talk = talksToBeSorted[i];
            if (talk.isScheduled()) {
                continue;
            }

            if (minutesToBeAllocated >= talk.durationInMinutes) {
                minutesToBeAllocated = minutesToBeAllocated - talk.durationInMinutes;
                talksAllocatedForSession.push(talk);
            }
        }
    }
    return talksAllocatedForSession;
};

Track.prototype.addSessionToTrack = function(session) {
    var eventsInSession = session.getEventList();
    for (var i = 0; i < eventsInSession.length; i++) {
        var talk = eventsInSession[i];
        var finalEvent = this.timeToString() + '' + talk.talkContents;
        this.eventsInTrack.push(finalEvent);
        this.updateTime(talk.durationInMinutes);
        talk.setScheduled(true);
    }
};

Track.prototype.getAccumulatedTime = function() {
    var accumulatedTimeInMinutes = 0;
    if (this.period === TIME.PM) {
        accumulatedTimeInMinutes += 12 * 60;
    }
    accumulatedTimeInMinutes += this.hours * 60;
    accumulatedTimeInMinutes += this.minutes;
    return accumulatedTimeInMinutes;
};

Track.prototype.updateTime = function(durationInMinutes) {
    var accumulatedTime = this.getAccumulatedTime() + Number(durationInMinutes);
    if (accumulatedTime >= (12 * 60)) {
        this.period = TIME.PM;
        accumulatedTime = accumulatedTime - (12 * 60);
    } else {
        this.period = TIME.AM;
    }
    this.hours = Math.floor(accumulatedTime / 60);
    this.minutes = accumulatedTime % 60;

    return this.timeToString();
};

Track.prototype.timeToString = function() {
    var hourToPrint = '0';
    var minuteToPrint = '0';
    if (this.hours < 10) {
        hourToPrint += this.hours;
    } else {
        hourToPrint = this.hours;
    }
    if (this.minutes < 10) {
        minuteToPrint += this.minutes;
    } else {
        minuteToPrint = this.minutes;
    }
    return hourToPrint + ':' + minuteToPrint + this.period + ' ';
};

Track.prototype.configLunchToTrack = function() {
    this.eventsInTrack.push("12:00PM Lunch");
    this.hours += 1;
};

Track.prototype.configNetworkingEventToTrack = function() {
    this.checkNetworkEventTime();
    this.eventsInTrack.push(this.timeToString() + "Networking Event");
};

Track.prototype.checkNetworkEventTime = function() {
    if (this.hours < 4 && this.period === TIME.PM) {
        this.hours = 4;
    }
};

Track.prototype.getUnallocatedTalks = function() {
    return this.talkList;
};

Track.prototype.printTrackList = function() {
    for (var i=0; i< this.eventsInTrack.length; i++) {
        console.log(this.eventsInTrack[i]);
    }
};

var orderTalksByDuration = function(talksToBeOrdered) {
    talksToBeOrdered.sort(function(a, b){
        if (b.durationInMinutes > a.durationInMinutes) {
            return 1;
        }
        if (b.durationInMinutes < a.durationInMinutes) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
    return talksToBeOrdered;
}

exports = module.exports = Track;