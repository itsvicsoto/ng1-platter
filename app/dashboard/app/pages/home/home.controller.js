(function() {
  'use strict';

  angular
    .module('app.modules.home', [])
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$stateParams', '$state', 'AppGeneralRest']

  function HomeController($scope, $stateParams, $state, AppGeneralRest) {
    var vm = this;

    var getSomething = AppGeneralRest.all('something');

    getSomething.customGET().then(function(response) {
      vm.getSomethingResult = response.data.plain();
    })

    vm.sampleJson = {
      'myKey': 'myValue',
      'myArray': [1, 2, 3, 4, 5]
    }

  }

}());