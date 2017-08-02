(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$q', '$rootScope', '$scope', '$timeout', 'config', 'logger',
    'authService', '$location', '$state'];

  /* @ngInject */
  function HeaderController($q, $rootScope, $scope, $timeout, config, logger,
     authService, $location, $state) {

    var vm = this;

    vm.signupErrorMsg = '';
    vm.logoff = logoff;
    vm.auth = authService;
    vm.username = authService.username;


    activate();


    function activate() {

    }

    /**logs the current user off and redirect to homepage */
    function logoff() {
      authService.logout().then(function (response) {
        $state.go('home');
      }, function (err) {
        vm.signupErrorMsg = "Sorry, there was an error loging you out. Try again";
      });
    };

  }
})();
