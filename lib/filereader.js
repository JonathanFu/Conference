var fs = require("fs");
var path = require('path');
var Talk = require('./talk');
var ConferenceError = require('../errors/conferenceerror');
var CHAR_SET = 'utf8';

module.exports.getTalkList = function(file) {
    var fileContents = loadFile(file);
    return formatAllTalks(fileContents);
};

var loadFile = function(file){
    try {
        return fs.readFileSync(path.resolve(__dirname, file), CHAR_SET);
    } catch (e){
        throw new ConferenceError(e.message);
    }
}

var formatAllTalks = function(talks) {
    var talksArr = talks.split(/\r\n|\r|\n/);
    var formattedTalks = [];
    for (var i = 0; i < talksArr.length; i++) {
        var unformattedTalk = talksArr[i];
        var formattedTalk = new Talk(unformattedTalk);
        formattedTalks.push(formattedTalk);
    }
    return formattedTalks;
}
