/**
 * Module dependencies.
 */
var express = require('express')
    , http = require('http')
    , bodyParser = require('body-parser');

var app = express();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.text({
  type: 'application/json'
}));

app.set('port', PORT);

app.use(function (err, req, res, next) {
  if (!err) return next(); // you also need this line
  console.log("error!!!" + err);
  res.send({ error: err });
});

// load our routes and pass in our app and fully configured passport
require('./routes/routes.js')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});