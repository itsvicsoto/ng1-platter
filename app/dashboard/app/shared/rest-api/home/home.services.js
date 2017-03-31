(function() {
  'use strict';

  angular.module('app.shared.restapi')
    .service('AppRestApiDashboard', AppRestApiDashboard);

  AppRestApiDashboard.$inject = ['$stateParams', 'AppGeneralRest'];

  function AppRestApiDashboard($stateParams, AppGeneralRest) {

    function buildReqParameters(parameters) {
      return parameters;
    }

    /**
     * Yields: domain.com/api/test
     */
    this.getSomething = function() {
      var req = AppGeneralRest.all('test')

      return req.customGET('');
    };


  }

})();