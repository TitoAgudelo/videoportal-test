(function () {
  'use strict';

  angular
    .module('app.account')
    .controller('LoginController', LoginController);

  LoginController.$inject = [
    'authService', 'logger', '$scope', '$rootScope',
    '$http', 'returnUrl', 'siteSettings', '$location', 'routerHelper', '$state', '$uibModalInstance', 'md5'];

  /* @ngInject */
  function LoginController(authService, logger, $scope, $rootScope,
    $http, returnUrl, siteSettings, $location, routerHelper, $state, $uibModalInstance, md5) {

    var vm = this;
    vm.title = 'Login';
    vm.login = login;
    vm.logout = logout;
    vm.close = close;


    $rootScope.$on('auth.login.close', function () {
      $uibModalInstance.close();
    });

    function close() {
      $uibModalInstance.close();
    }

    /*performs login operation */
    function login() {

      var passwordMD5 = md5.createHash($scope.user.password);

      authService.login($scope.user.username, passwordMD5)
        .then(function (response) {

          $uibModalInstance.close();

          if (returnUrl && !(returnUrl == '/' || returnUrl.startsWith('/?')) ) {
            $location.search('');
            $location.path(returnUrl);
          }
          else {
            var defaultRoute = getDefaultRoute();
            $state.go('videos', {});
          }
        }, function (err) {
          $scope.signupErrorMsg = "Sorry, there was an error loging you in.";
        });

    }

    function getDefaultRoute() {
      return routerHelper.getStates().filter(function (r) {
        return r.settings && r.settings.isDefault;
      })[0];
    }

    /* performs loguout operation */
    function logout() {
      authService.logout()
        .then(function (response) {
          $location.path('/');
        }, function (err) {
          $scope.signupErrorMsg = "Sorry, there was an error loging you out. Try again";
        });
    }


    $scope.user = {
      username: '',
      password: '',
      rememberme: true,
    };

  }
})();
