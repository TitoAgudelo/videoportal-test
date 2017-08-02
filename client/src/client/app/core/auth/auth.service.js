(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('authService', authService);

  authService.$inject = ['$http', '$q', 'logger', 'siteSettings', 'localStorageService', '$uibModal', '$templateCache', 'exception'];
  /* @ngInject */
  function authService($http, $q, logger, siteSettings, localStorageService, $uibModal, $templateCache, exception) {

    var service = {
      isAuthenticated: false,
      userName: '',
      sessionId: '',
      loginModal: loginModal,
      loginModalOpen: false,
      loadAuthData: loadAuthData,
      login: login,
      logout: logout
    };

    return service;

    /**opens the login modal */
    function loginModal(returnUrl) {

      if (!service.loginModalOpen) {
        service.loginModalOpen = true;

        var modalInstance = $uibModal.open({
          animation: true,
          template: $templateCache.get('app/account/login/login.html'),
          templateUrl: 'app/account/login/login.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          resolve: {
            returnUrl: function () {
              return returnUrl;
            }
          }
        });

        modalInstance.closed.then(function () {
          service.loginModalOpen = false;
        });
      }

    }

    /**
    given username and password, calls token endpoint to login a user.
    */
    function login(username, password) {
        // post to server to clear cookie and invalidate token
        var deferred = $q.defer();

        /* authenticate user here */
        $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        // Send this header only in post requests. Specifies you are sending a JSON object
        $http.defaults.headers.post['dataType'] = 'json'

        $http.post(siteSettings.apiBaseUrl + '/user/auth', {username: username, password: password})
        .success(function (response) {

          // clear auth data
          localStorageService.set('video.authorizationData', {
            userName: response.username,
            userId: response.sessionId
          });

          service.isAuthenticated = true;
          service.userName = response.username;
          service.sessionId = response.sessionId;

          deferred.resolve(response);
        }).error(function (err, status) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    /** loads authorization data from the local storage*/
    function loadAuthData() {

      var authData = localStorageService.get('video.authorizationData');
      if (authData && authData.sessionId) {
        service.isAuthenticated = true;
        service.userName = authData.username;
      }
    }

    /** clears authorization data (token) */
    function logout(sessionId) {

      // post to server to clear cookie
      var deferred = $q.defer();

      /* authenticate user here */
      $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      // Send this header only in post requests. Specifies you are sending a JSON object
      $http.defaults.headers.post['dataType'] = 'json'

      $http.post(siteSettings.apiBaseUrl + '/user/logout' + '?sessionId=' + sessionId ? sessionId : service.sessionId)
        .success(function (response) {

          // clear auth data
          localStorageService.remove('video.authorizationData');

          service.isAuthenticated = false;
          service.userName = '';
          service.sessionId = '';

          deferred.resolve(response);
        }).error(function (err, status) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

  }
})();
