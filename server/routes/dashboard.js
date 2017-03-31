var request = require('request');
var utils = require('../utils');

module.exports = function(app) {
  var router = app.loopback.Router();

  app.get('/dashboard/*', function(req, res) {
    console.log(__dirname + '/../app/dashboard');
    res.sendFile('index.html', {
      root: __dirname + '/../../app/dashboard'
    });
  });

  // app.get('/dashboard/**', function(req, res) {
  //
  //   console.log(__dirname + '/../app/dashboard');
  //   res.sendFile('index.html', {
  //     root: __dirname + '/../app/dashboard'
  //   });
  // });


};
