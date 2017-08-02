(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('hcChart', hcChart);

  hcChart.$inject = ['config'];
  /* @ngInject */
  function hcChart(config) {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], scope.options);
        }
    };
  }
})();
