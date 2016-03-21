var mainCtrl = require('../controllers/main');

/*
 * routes.js
 */
module.exports = function(app){

  app.post('/', mainCtrl.printConference);

};