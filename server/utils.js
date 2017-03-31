/**
 * Your utility library for express
 */

var basicAuth = require('basic-auth');
var _ = require('underscore');

/**
 * Simple basic auth middleware for use with Express 4.x.
 *
 * @example
 * app.use('/api-requiring-auth', utils.basicAuth('username', 'password'));
 *
 * @param   {string}   username Expected username
 * @param   {string}   password Expected password
 * @returns {function} Express 4 middleware requiring the given credentials
 */
exports.basicAuth = function(username, password) {
  return function(req, res, next) {
    var user = basicAuth(req);

    var nonSecurePath = ['/renderer', '/renderer/', '/vendor/dustjs/dist/dust-full-0.3.0.min.js'];

    console.log('req.path', req.path);

    if (_.contains(nonSecurePath, req.path)) return next();

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }

    next();
  };
};
