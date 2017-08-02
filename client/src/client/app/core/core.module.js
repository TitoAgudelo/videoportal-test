(function() {
  'use strict';

  angular
    .module('app.core', [
      'ngAnimate', 'ngSanitize',
      'blocks.exception', 'blocks.logger', 'blocks.router', 'blocks.settings',
      'ui.router', 'ngplus', 'LocalStorageModule',
      'colorpicker.module', 'ngFileUpload', 'ui.bootstrap',
      'ngclipboard', 'angularMoment', 'angular-confirm', 'angular-md5'
    ]);
})();
