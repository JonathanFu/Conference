
var Conference = require('../lib/conference');

exports.printConference = function (req, res, next) {
    var filePath;
    try {
        filePath = JSON.parse(req.body).filePath;
    } catch (e) {
        res.status(400);
        return res.json({'error': 'Could not decode request: JSON parsing failed'});
    }

    try {
        new Conference().setupConferenceSchedule(filePath);
    } catch (e) {
        res.status(e.status || 500);
        return res.json({'error': 'Could not print the schedule, Error:' + e.message});
    }

    res.json({res: 'OK'});
};

