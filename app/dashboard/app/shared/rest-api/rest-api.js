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

  AppPathResolver.$inject = ['appConfiguration'];

  function AppPathResolver(appConfiguration) {

    var service = {
      resolvePath: resolvePath
    };

    return service;

    function resolvePath() {
      if (window.location.hostname == 'localhost' || window.location.hostname == appConfiguration().HEROKU_HOSTNAME) {
        return appConfiguration().LOCAL.API_BASE_URL
      } else {
        return 'http://' + window.location.hostname + ':8081/api/';
      }
    }

  }

}());