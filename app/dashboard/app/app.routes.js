(function() {
  'use strict';

  angular
    .module('app.routes', [
      'ui.router'
    ])
    .config(config);

  config.$inject = ['$stateProvider', '$locationProvider'];

  /* @ngInject */
  function config($stateProvider, $locationProvider) {

    $stateProvider
      .state('main', {
        url: '/dashboard',
        abstract: true,
        controller: 'MainController',
        controllerAs: 'vm',
        data: {},
        views: {
          'header': {
            templateUrl: 'components/header/header.html'
          }
        }
      })
      .state('main.home', {
        url: '/',
        views: {
          '@': {
            templateUrl: 'pages/home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
          }
        }
      })

    // OTHER ROUTES ON MODULES CAN BE FOUND ON EACH MODULE FOLDER
    // this will make routes pluggable as modules on demand
    // routes found here are required for the app

  }

})();