(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('addthisToolbox', addthisToolbox);

  addthisToolbox.$inject = ['config'];
  /* @ngInject */
  function addthisToolbox(config) {
    return {
      restrict : 'A',
      transclude : true,
      replace : true,
      template : '<div ng-transclude></div>',
      link : function($scope, element, attrs) {
        addthis.init();
        addthis.toolbox($(element).get(), {}, {
          url: attrs.url,
          title : attrs.title,
          description : attrs.description        
        });
      }
    };
  }
})();