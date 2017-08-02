(function () {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$q', 'logger', '$scope', '$rootScope', 'Upload', '$uibModal', '$templateCache', '$state', '$timeout', 'authService'];
	/* @ngInject */
	function HomeController($q, logger, $scope, $rootScope, Upload, $uibModal, $templateCache, $state, $timeout, authService) {
		var vm = this;
		vm.title = 'Welcome to Crossover Video Portal!';

		activate();

		function activate() {

			if (authService.isAuthenticated == true) {
				$state.go('post');
			}
			else {
				mixpanel.track("Landing Page View", {
					"PageVersion": "v5"
				});

				if ($state.params.login) {
					$timeout(function () {
						authService.loginModal($state.params.returnUrl);
					}, 500);
				}
			}
		}
  }
})();
