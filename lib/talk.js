var ConferenceError = require('../errors/conferenceerror');

var minSuffix = "min";
var lightningSuffix = "lightning";
var space = " ";

function Talk(talkInput) {
    this.talkContents = talkInput;
    this.title = this._getTitle();
    this.durationInMinutes = this._getDuration();
    this.scheduledFlag = false;
}

Talk.prototype._getTitle = function() {

    if(!strEndsWith(this.talkContents, minSuffix) && !strEndsWith(this.talkContents, lightningSuffix)){
        // throw invalid exception
        throw new ConferenceError('Invalid task format.' + this.talkContents);
    }

    return this.talkContents.substring(0, this.talkContents.lastIndexOf(space));
};

Talk.prototype._getDuration = function() {
    try {
        if (strEndsWith(this.talkContents, minSuffix)) {
            this.durationInMinutes = Number(this.talkContents.substring(this.title.length + 1, this.talkContents.lastIndexOf(minSuffix)));
        } else {
            this.durationInMinutes = 5;
        }
    } catch (ex) {
        throw new ConferenceError("Invalid talk time, " + this.talkContents + ". Time must be in min or in lightning. Detail:" + ex.message);
    }
    return this.durationInMinutes;
};

Talk.prototype.setScheduled = function(flag) {
    this.scheduledFlag = flag;
}

Talk.prototype.isScheduled = function() {
    return this.scheduledFlag;
}

function strEndsWith(str, suffix) {
    if (!str){
        return false;
    }

    if (str.length < suffix.length)
        return false;
    return str.lastIndexOf(suffix) === str.length - suffix.length;
}

exports = module.exports = Talk;