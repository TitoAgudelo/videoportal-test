(function (window) {
    var angular = window.angular;
    angular.module('app.core')
		.directive('mixTracker', function () {
		    return {
		        restrict: 'A',
		        link: function (scope, el, attr) {
		            el.bind('mousedown', function (event) {
		                mixpanel.track(el.data("mix-tracker"));
		            });
		        }
		    };
		});
}(window));