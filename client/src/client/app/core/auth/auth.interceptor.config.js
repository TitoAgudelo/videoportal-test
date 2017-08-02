(function () {
  'use strict';

  var core = angular.module('app.core');

  core.config(configure);

  core.run(loadAuthData);

  /* configures an http interceptor */
  function configure($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
  }

  loadAuthData.$inject = ['authService'];
  /* @ngInject */
  function loadAuthData(authService) {
    authService.loadAuthData();
  }

})();
