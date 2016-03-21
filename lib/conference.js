var Track = require('./track');
var FileReader = require('./fileReader');

function Conference() {
    this.trackList = [];
}

Conference.prototype.setupConferenceSchedule = function(file) {
    var fileContents = readTheFile(file);
    this._addTracks(fileContents);
    this._printTracks();
}

Conference.prototype._addTracks = function(trackContents) {
    var trackOne = new Track(trackContents);
    this.trackList.push(trackOne);

    var unallocatedTalks = trackOne.getUnallocatedTalks();
    var trackTwo = new Track(unallocatedTalks);
    this.trackList.push(trackTwo)
}

Conference.prototype._printTracks = function() {

    for(var i=1; i<= this.trackList.length; i++){
        console.log("\nTrack:" + i);
        this.trackList[i-1].printTrackList();
    }
}

var readTheFile = function(file) {
    return FileReader.getTalkList(file);
}

exports = module.exports = Conference;