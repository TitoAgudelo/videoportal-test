(function () {
	'use strict';

	angular
		.module('app.core')
		.controller('LoginSignupCtaController', LoginSignupCtaController);

	LoginSignupCtaController.$inject = ['authService', '$location'];
	/* @ngInject */
	function LoginSignupCtaController(authService, $location) {
		var vm = this;
		vm.login = login;
    vm.signup = signup;


		function login() {
			authService.loginModal($location.path());
		};

    function signup(trackingSource) {
      authService.signupModal('join', trackingSource);
    }

  }
})();