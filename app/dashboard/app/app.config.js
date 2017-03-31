(function() {
  'use strict';

  angular
    .module('app.config', [
      'ui.router'
    ])
    .run(run)
    .config(config);

  run.$inject = ['$rootScope'];

  /* @ngInject */
  function run($rootScope) {}

  config.$inject = ['$locationProvider'];

  /* @ngInject */
  function config($locationProvider) {

    $locationProvider.html5Mode(true);

    // $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|blob|file|mailto|chrome-extension):/);

  }

})();