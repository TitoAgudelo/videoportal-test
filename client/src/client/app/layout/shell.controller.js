(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$q', '$rootScope', '$timeout', 'config', 'logger', 'authService'];
  /* @ngInject */
  function ShellController($q, $rootScope, $timeout, config, logger, authService) {
    var vm = this;

    vm.isAuthenticated = authService.isAuthenticated;

    activate();

    function activate() {
      if (authService.isAuthenticated) {

        var activationPromises = [
          authService.loadAuthData()
        ];

        return $q.all(activationPromises);
      }
    }
  }
})();
