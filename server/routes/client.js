var request = require('request');
var utils = require('../utils');

module.exports = function(app) {
  var router = app.loopback.Router();

  app.get('/', function(req, res) {
    res.render('home');
  });

  app.get('/:page', function(req, res) {

    var page = req.params.page;

    res.render(page, function(err, html) {

      if (err) {
        res.send('404 Page Not Found');
      }

      res.send(html);
    });

  });

};
