(function() {
  'use strict';

  angular
    .module('app.shared.restapi', [])
    .factory('AppGeneralRest', AppGeneralRest)
    .factory('AppPathResolver', AppPathResolver);


  AppGeneralRest.$inject = ['Restangular', 'AppPathResolver', 'appConfiguration'];

  function AppGeneralRest(Restangular, AppPathResolver, appConfiguration) {
    return Restangular.withConfig(function(RestangularConfigurer) {

      RestangularConfigurer.setFullResponse(true);

      RestangularConfigurer.setRequestInterceptor(function(elem, operation) {
        if (operation === "remove") {
          return undefined;
        }
        return elem;
      });

      RestangularConfigurer.setBaseUrl(AppPathResolver.resolvePath());

      RestangularConfigurer.setDefaultHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-AUTH-TOKEN": appConfiguration().TEST_TOKEN
        // "X-AUTH-TOKEN": localStorageService.get('token')
      });

    });
  }

  AppPathResolver.$inject = [];

  function AppPathResolver() {

    var service = {
      resolvePath: resolvePath
    };

    return service;

    function resolvePath() {
      if (window.location.hostname == 'localhost') {
        return 'http://localhost:8080/api/';
      } else {
        return 'http://' + window.location.hostname + ':8081/api/';
      }
    }

  }

}());