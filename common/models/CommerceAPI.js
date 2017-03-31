var request = require('request');

var baseUrl = 'http://hackathon.toro.io';
//var baseUrl = 'http://192.168.22.30:5000';
//var baseUrl = 'http://192.168.21.47';

module.exports = {
  products: {
    all: function (callback) {
      request(baseUrl + '/products', function (error, response, body) {
        //console.log('body :', body);
        //if (!error && response.statusCode == 200) {
        //console.log(body) // Show the HTML for the Google homepage.
        callback && callback(error, response, body);
        //}
      });
    },
    getProductDetails: function (data, callback) {
      request(baseUrl + '/products/' + data.id, function (error, response, body) {
        callback && callback(error, response, body);
      });
    },
    getCategories: function (callback) {
      request(baseUrl + '/categories', function (error, response, body) {
        callback && callback(error, response, body);
      });
    },
    getProductsByCategory: function (data, callback) {
      request(baseUrl + '/categories/' + data.categoryName + '/products', function (error, response, body) {
        callback && callback(error, response, body);
      });
    }
  }
};
