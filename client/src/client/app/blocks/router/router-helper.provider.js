/* Help configure the state-base ui.router */
(function () {
  'use strict';

  angular
    .module('blocks.router')
    .provider('routerHelper', routerHelperProvider);

  routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
  /* @ngInject */
  function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
    /* jshint validthis:true */
    var config = {
      docTitle: undefined,
      resolveAlways: {}
    };

    if (!(window.history && window.history.pushState)) {
      window.location.hash = '/';
    }

    $locationProvider.html5Mode(true);

    this.configure = function (cfg) {
      angular.extend(config, cfg);
    };

    this.$get = RouterHelper;
    RouterHelper.$inject = ['$location', '$rootScope', '$state', 'logger', 'authService'];
    /* @ngInject */
    function RouterHelper($location, $rootScope, $state, logger, authService) {
      var handlingStateChangeError = false;
      var hasOtherwise = false;
      var stateCounts = {
        errors: 0,
        changes: 0
      };

      var service = {
        configureStates: configureStates,
        getStates: getStates,
        stateCounts: stateCounts
      };

      init();

      return service;

      ///////////////

      function configureStates(states, otherwisePath) {
        states.forEach(function (state) {
          state.config.resolve =
            angular.extend(state.config.resolve || {}, config.resolveAlways);
          $stateProvider.state(state.state, state.config);
        });
        if (otherwisePath && !hasOtherwise) {
          hasOtherwise = true;
          $urlRouterProvider.otherwise(otherwisePath);
        }
      }

      function handleRoutingErrors() {
        // Route cancellation:
        // On routing error, go to the dashboard.
        // Provide an exit clause if it tries to do it twice.
        $rootScope.$on('$stateChangeError',
          function (event, toState, toParams, fromState, fromParams, er) {
            if (handlingStateChangeError) {
              return;
            }
            var error = er || {};
            stateCounts.errors++;
            handlingStateChangeError = true;
            var destination = (toState &&
              (toState.title || toState.name || toState.loadedTemplateUrl)) ||
              'unknown target';
            var msg = 'Error routing to ' + destination + '. ' +
              (error.data || '') + '. <br/>' + (error.statusText || '') +
              ': ' + (error.status || '');
            logger.warning(msg, [toState]);
            $state.go('404');
          }
        );
      }

      function handleAuthProtectedRoutes() {
        $rootScope.$on('$stateChangeStart',
          function (event, toState, toParams, fromState, fromParams, er) {
            if (toState.authorize && !authService.isAuthenticated) {
              event.preventDefault();
              $state.go('home', { login: true, returnUrl: toState.url });
            }
          }
        );
      }


      function init() {
        handleAuthProtectedRoutes();
        handleRoutingErrors();
        updateDocTitle();
        homePageCondition();
        shellPageCondition();
      }

      function getStates() { return $state.get(); }

      function updateDocTitle() {
        $rootScope.$on('$stateChangeSuccess',
          function (event, toState, toParams, fromState, fromParams) {
            stateCounts.changes++;
            handlingStateChangeError = false;
            var title = config.docTitle + ' ' + (toState.title || '');
            $rootScope.title = title; // data bind to <title>
          }
        );
      }

      function shellPageCondition() {
        $rootScope.isShellPage = function () {
          return $location.path() == '/videos'
          || $location.path() == '/page-not-found'
          || $location.path() == '/authcomplete';
        }

        $rootScope.isNotShellPage = function () {
          return !this.isShellPage();
        };

      }

      function homePageCondition() {

        $rootScope.isHomePage = function () {
          return $location.path() == '/'
          || $location.path() == '/page-not-found'
          || $location.path() == '/authcomplete';
        };

        $rootScope.isNotHomePage = function () {
          return !this.isHomePage();
        };
      }
    }
  }
})();
