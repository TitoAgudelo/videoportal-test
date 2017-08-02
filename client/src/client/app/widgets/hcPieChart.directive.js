(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('hcPieChart', hcPieChart);

  hcPieChart.$inject = ['config'];
  /* @ngInject */
  function hcPieChart(config) {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            title: '@',
            data: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch("data" ,function(newValue,oldValue) {
                Highcharts.chart(element[0], {
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: scope.title
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                            },
                            showInLegend: true
                        }
                    },
                    
                    series: [{
                        name: 'Number of Tags',
                        data: scope.data
                    }]
                });
            });
        }
    };
  }
})();