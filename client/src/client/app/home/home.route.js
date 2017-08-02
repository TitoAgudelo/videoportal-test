(function() {
  'use strict';

  angular
    .module('app.home')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'home',
        config: {
          url: '/?login=&returnUrl=',
          templateUrl: 'app/home/home.html',
          title: 'Welcome to Crossover Video Portal'
        }
      }
    ];
  }
})();
