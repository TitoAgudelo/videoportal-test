/* global toastr:false, moment:false */
(function () {
  'use strict';

  angular
    .module('blocks.settings')
    .constant('siteSettings', {
      useTestData: true,
      websiteRootUrl: 'http://localhost:3000',
      environment: 'dev',
      apiBaseUrl: 'http://localhost:3000'
    });
})();
