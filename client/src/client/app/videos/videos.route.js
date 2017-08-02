(function() {
  'use strict';

  angular
    .module('app.videos')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'videos',
        config: {
          url: '/videos',
          templateUrl: 'app/videos/videos.html',
          controller: 'VideosController',
          controllerAs: 'vm',
          title: 'videos',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i>'
          }
        }
      }
    ];
  }
})();
