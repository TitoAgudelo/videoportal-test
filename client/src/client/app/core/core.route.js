(function() {
  'use strict';

  angular
    .module('app.core')
    .run(appRun);

  /* @ngInject */
  function appRun(routerHelper) {
    var otherwise = '/page-not-found';
    routerHelper.configureStates(getStates(), otherwise);
  }

  function getStates() {
    return [
      {
        state: '404',
        config: {
          url: '/page-not-found',
          templateUrl: 'app/core/404.html',
          title: '404'
        }
      }
    ];
  }
})();
