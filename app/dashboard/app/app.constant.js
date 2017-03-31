(function() {
  'use strict';

  angular
    .module('app.constant', [])
    .constant('appConfiguration', appConfiguration)

  function appConfiguration() {
    return {
      LOCAL: {
        BASE_URL: 'http://localhost:8080/api/'
      },
      PRODUCTION: {
        BASE_URL: 'http://localhost:8081/api/'
      },
      TEST_TOKEN: 'REPLACE_THIS_WITH_TOKEN',
      APIKEY: 'qJlhE9AKM6yAPykk',
      DEBUG_CLIENT: true,
      DEBUG_REMOTE: false,
      IGNORE_LOGIN: true
    }

  }

})();