var CommerceAPI = require('./CommerceAPI');

module.exports = function (Category) {

  Category.products = function (categoryName, cb) {
    CommerceAPI.products.getProductsByCategory({categoryName: categoryName}, function (error, response, body) {
      cb(null, JSON.parse(body));
    });
  };

  Category.remoteMethod(
    'products',
    {
      http: {path: '/:categoryName/products', verb: 'get'},
      accepts: {arg: 'categoryName', type: 'string'},
      returns: {arg: 'remoteCategoryProducts', type: 'string'}
    }
  );

  Category.remoteCategories = function (cb) {
    CommerceAPI.products.getCategories(function (error, response, body) {
      cb(null, JSON.parse(body));
    });
  };

  Category.remoteMethod(
    'remoteCategories',
    {
      http: {path: '/remoteCategories', verb: 'get'},
      returns: {arg: 'remoteCategories', type: 'string'}
    }
  );

};
