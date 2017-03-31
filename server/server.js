// Application Dependencies
var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

// Engine Dependencies
var consolidate = require('consolidate');
var utils = require('./utils');

// Start Using loopback as Application
var app = module.exports = loopback();

// View Engine for Website
app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', [path.join(__dirname, '../app/website')]);

// Routing
var router = app.loopback.Router();
var path = require('path');

// Password Protect Everything
// app.use('/', utils.basicAuth('weka', 'wekalogic'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

// When Accessing Specific files
app.use('/', loopback.static(path.resolve(__dirname, '../app/website'), {
  maxAge: 31557600000
}));

app.use('/temp', loopback.static(path.resolve(__dirname, '../temp')));
app.use('/vendor', loopback.static(path.resolve(__dirname, '../bower_components')));
app.use('/dashboard', loopback.static(path.resolve(__dirname, '../app/dashboard'), {
  maxAge: 31557600000
}));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));

    require('./routes/dashboard')(app);
    require('./routes/client')(app);

    // Catching All Pages that arent found
    app.use('*', function(req, res) {
      res.send('404 Page Not Found')
    });

  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});