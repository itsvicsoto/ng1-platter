(function() {
  'use strict';

  angular
    .module('app', [

      // vendor specific modules

      'restangular',
      // 'cgNotify',
      // 'oitozero.ngSweetAlert',
      'ui.bootstrap',
      // 'angular-loading-bar',
      // 'angularFileUpload',
      // 'ngFileSaver',
      // 'ngSanitize',

      // app configs
      'app.constant',
      'app.templates',
      'app.config',
      'app.routes',

      // rest api
      'app.shared.restapi',

      // per module/feature
      'app.modules.home',

    ])
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$state', '$stateParams'];

  /* @ngInject */
  function MainController($scope, $state, $stateParams) {
    var vm = $scope;

    console.log('DEBUG::MainController', $state.current);

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

      // when state changes do something

    });

  }

})();