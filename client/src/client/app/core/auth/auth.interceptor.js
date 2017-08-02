(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('authInterceptorService', authInterceptorService);

  authInterceptorService.$inject = ['$q', '$location', 'localStorageService',];
  /* @ngInject */
  function authInterceptorService($q, $location, localStorageService) {
    var service = {
      request: request,
      responseError: responseError
    };

    return service;

    /* will be fired before $http sends the request to the API */
    function request(config) {

      config.headers = config.headers || {};

      var authData = localStorageService.get('video.authorizationData');
      if (authData) {
        config.headers.Authorization = 'Basic ' + authData.sessionId;
      }

      return config;
    }

    /* will be hit after we receive a response back from the API only if there's a failure */
    function responseError(rejection) {
      if (rejection.status === 401) {
        $location.path('/');
      }
      return $q.reject(rejection);
    }

  }
})();
