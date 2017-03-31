var CommerceAPI = require('./CommerceAPI');

module.exports = function (Product) {


  // FEATURED
  // ==============================

  Product.featured = function (cb) {

    var tmpProducts = [];

    Product.find({where: {isFeatured: true}}, function (err, response) {

      var totalFeaturedLength = response;

      if (totalFeaturedLength.length == 0) {
        cb(null, tmpProducts);
      }

      response.forEach(function (product) {
        CommerceAPI.products.getProductDetails({id: product.remoteId}, function (error, response, body) {

          tmpProducts.push(JSON.parse(body));

          if (tmpProducts.length == totalFeaturedLength.length) {
            cb(null, tmpProducts);
          }

        })
      });

    });

  };

  Product.remoteMethod(
    'featured',
    {
      http: {path: '/featured', verb: 'get'},
      returns: {arg: 'featured', type: 'string'}
    }
  );

  // COMMERCEAPI PRODUCTS
  // ==============================

  Product.remoteProducts = function (cb) {

    CommerceAPI.products.all(function (error, response, body) {

      cb(null, JSON.parse(body));

    });

  };

  Product.remoteMethod(
    'remoteProducts',
    {
      http: {path: '/remoteProducts', verb: 'get'},
      returns: {arg: 'remoteProducts', type: 'string'}
    }
  );

  //COMMERCEAPI PRODUCT DETAILS
  //==============================

  Product.remoteProductDetails = function (id, cb) {
    CommerceAPI.products.getProductDetails({id: id}, function (error, response, body) {
      cb(null, JSON.parse(body));
    })
  };

  Product.remoteMethod(
    'remoteProductDetails',
    {
      http: {path: '/remoteProduct/:id', verb: 'get'},
      accepts: {arg: 'id', type: 'string'},
      returns: {arg: 'remoteProductDetails', type: 'string'}
    }
  );

  //COMMERCEAPI make featured
  //==============================

  Product.makeFeatured = function (remoteId, cb) {

    var queryFilter = {where: {remoteId: remoteId}};

    var dataToInsert = {
      remoteId: remoteId,
      isFeatured: true,
      popularityCount: 0,
      id: 0
    };

    Product.findOrCreate(queryFilter, dataToInsert, function (err, response) {

      response['isFeatured'] = true;

      Product.upsert(response, function (err, obj) {
        cb(null, {message: "Successfully featured an item '" + remoteId + "'!"});
      });

    });

  };

  Product.remoteMethod(
    'makeFeatured',
    {
      http: {path: '/featured', verb: 'post'},
      accepts: {arg: 'remoteId', type: 'string'},
      returns: {arg: 'featured', type: 'string'}
    }
  );

  //COMMERCEAPI +1 Popularity on a product
  //==============================

  Product.popularity = function (remoteId, cb) {

    var queryFilter = {where: {remoteId: remoteId}};

    var dataToInsert = {
      remoteId: remoteId,
      isFeatured: false,
      popularityCount: 0,
      id: 0
    };

    Product.findOrCreate(queryFilter, dataToInsert, function (err, response) {

      response['popularityCount'] += 1;

      Product.upsert(response, function (err, obj) {
        cb(null, {message: "Successfully +1 an item '" + remoteId + "'!"});
      });

    });

  };

  Product.remoteMethod(
    'popularity',
    {
      http: {path: '/popularity', verb: 'post'},
      accepts: {arg: 'remoteId', type: 'string'},
      returns: {arg: 'popularity', type: 'string'}
    }
  )

  //COMMERCEAPI Get all products with popularity count
  //==============================

  Product.popularItems = function (cb) {
    var queryFilter = {
      where: {
        popularityCount: {
          gt: 0
        }
      },
      order: 'popularityCount DESC'
    };

    var tmpProducts = [];

    Product.find(queryFilter, function (err, response) {
      var totalPopularItems = response;
      var tmpProductCounter = 0;

      if (totalPopularItems.length == 0) {
        cb(null, response);
      } else {
        tmpProducts = response;
      }

      response.forEach(function (product, index) {
        CommerceAPI.products.getProductDetails({id: product.remoteId}, function (error, response, body) {

          tmpProducts[index] = JSON.parse(body);
          tmpProducts[index]['popularityCount'] = product.popularityCount;
          tmpProductCounter++;

          if (tmpProductCounter == totalPopularItems.length) {
            cb(null, tmpProducts);
          }

        })
      });
    });


  }

  Product.remoteMethod(
    'popularItems',
    {
      http: {path: '/popularity', verb: 'get'},
      returns: {arg: 'popularity', type: 'string'}
    }
  )


};
