(function() {
  'use strict';

  angular
    .module('app.videos')
    .controller('VideosController', VideosController);

  VideosController.$inject = ['$q', 'videosServices', 'logger', 'authService', '$state', '$scope'];
  /* @ngInject */
  function VideosController($q, videosServices, logger, authService, $state, $scope) {
    var vm = this;
    vm.news = {
      title: 'Video Portal',
      description: 'Videos list portal'
    };
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Videos';
    vm.getVideos = getVideos;
    vm.sessionId = authService.sessionId;
    vm.calculateAverageRating = calculateAverageRating;
    vm.averageRate = averageRate;
    activate();

    function activate() {
      logger.info('Activated Videos View');
      validateSession();
    }

    function validateSession() {
      if(!authService.sessionId) {
        $state.go('/', {});
      } else {
        vm.getVideos();
      }
    }

    function getVideos() {
      var session = vm.sessionId;
			return videosServices.getVideos(session).then(function (data) {
			  if(data.status === 'success'){
			    vm.videos = data.data;
				  return data;
        }
			}, function (errors) {
				logger.error('Error get followers, Try again. ' + errors[0].error);
			});
		}

		/*
     * Calculate average rating from array of values
     */
    function averageRate(ratings){
        $scope.average = vm.calculateAverageRating(ratings);
        return $scope.average;
    };

    //calculate average rating
    function calculateAverageRating(ratings) {
        var sum = 0;
        for (var i = 0; i < ratings.length; i++) {
            sum += parseInt(ratings[i], 10); //don't forget to add the base
        }
        var avg = sum/ratings.length;
        return avg;
    };


    // $scope.playerReady = function (api) {
    //     $scope.api = api;
    // };

    // $scope.stateChange = function (state) {
    //     if (state === 'play') {
    //         if($rootScope.playingVideo && $rootScope.plsyingVideo !== $scope.api)
    //             $rootScope.playingVideo.pause();
    //         $rootScope.playingVideo = $scope.api;
    //     }
    // };
    //
    // $scope.hoveringOver = function(value) {
    //     $scope.overStar = value;
    //     $scope.percent = 100 * (value / $scope.max);
    // };

    $scope.ratingStates = [
        {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
        {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
        {stateOn: 'glyphicon-heart'},
        {stateOff: 'glyphicon-off'}
    ];

    $scope.rateVideo = function(videoId, rate){
        // if ($rootScope.globals.currentUser) {
        //     var sessionId = $rootScope.globals.currentUser.sessionId;
        //     $scope.dataLoading = true;
        //     HomeService.rate(sessionId, videoId, rate, function(response) {
        //         if(response.status === 'success') {
        //             $scope.getVideos();
        //             $.toast({
        //                 text: "You rated<br/>Video: <b>"+response.data.name.substr(3)+"</b><br/>Rate: "+rate+"  ",
        //                 hideAfter: false
        //             });
        //
        //         } else {
        //             $scope.error = response.message;
        //             $scope.dataLoading = false;
        //         }
        //     });
        // } else {
        //     $scope.error = "User not logged in";
        //     $scope.dataLoading = false;
        // }
    };


  }
})();
