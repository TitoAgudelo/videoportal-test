(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('videosServices', videosServices);

  videosServices.$inject = ['$http', '$q', 'exception', 'logger', '$timeout', '$rootScope', 'siteSettings'];
  /* @ngInject */
  function videosServices($http, $q, exception, logger, $timeout, $rootScope, siteSettings) {

    var self = this;

    var service = {
        getVideos: getVideos
        /*getUserMe: getUserMe,
        getUsername: getUsername,
        getFollowers: getFollowers,
        getFollowing: getFollowing,
        getFullUsername: getFullUsername,
        getFullUserMe: getFullUserMe,
        getTags: getTags,
        getScoreStats: getScoreStats,
        followCareerPals: followCareerPals,
        unfollowCareerPals: unfollowCareerPals,
        bucketsCareerPals: bucketsCareerPals,
        autocompleteLocation: autocompleteLocation */
    }

    return service;

    function getVideos(sessionId) {
        return $http.get(siteSettings.apiBaseUrl + '/videos?sessionId=' + sessionId)
            .then(getVideosComplete)
            .catch(getVideosFailed);

        function getVideosComplete(response) {
            return response.data;
        }

        function getVideosFailed(error) {
            var errors = exception.parseErrors(error, "Sorry, there was an error signing you up.");
            return errors;
        }
    }

    /*function getUserMe() {
        return $http.get(siteSettings.apiBaseUrl + '/api/v4/users/me/compact')
            .then(getUserMeComplete)
            .catch(getUserMeFailed);

        function getUserMeComplete(response) {
            return response.data;
        }

        function getUserMeFailed(error) {
            var errors = exception.parseErrors(error, "Sorry, there was an error signing you up.");
            return errors;
        }
    }

    function getFullUserMe() {
        return $http.get(siteSettings.apiBaseUrl + '/api/v4/users/me')
            .then(getUserMeComplete)
            .catch(getUserMeFailed);

        function getUserMeComplete(response) {
            return response.data;
        }

        function getUserMeFailed(error) {
            var errors = exception.parseErrors(error, "Sorry, there was an error signing you up.");
            return errors;
        }
    }

    function getUsername(username) {
        return $http.get(siteSettings.apiBaseUrl + '/api/v4/users/'+ username +'/compact')
            .then(getUserMeComplete)
            .catch(getUserMeFailed);

        function getUserMeComplete(response) {
            return response.data;
        }

        function getUserMeFailed(error) {
            var errors = exception.parseErrors(error, "Sorry, there was an error signing you up.");
            return errors;
        }
    }

    function getFullUsername(username) {
        return $http.get(siteSettings.apiBaseUrl + '/api/v4/users/'+ username)
            .then(getUserMeComplete)
            .catch(getUserMeFailed);

        function getUserMeComplete(response) {
            return response.data;
        }

        function getUserMeFailed(error) {
            var errors = exception.parseErrors(error, "Sorry, there was an error signing you up.");
            return errors;
        }
    }

    function getFollowers() {
        return $http.get(siteSettings.apiBaseUrl + '/api/v4/community/users/me/mypals/followers')
            .then(getUserMeComplete)
            .catch(getUserMeFailed);

        function getUserMeComplete(response) {
            return response.data;
        }

        function getUserMeFailed(error) {
            var errors = exception.parseErrors(error, "Sorry, there was an error signing you up.");
            return errors;
        }
    }

    function getFollowing() {
        return $http.get(siteSettings.apiBaseUrl + '/api/v4/community/users/me/mypals/following')
            .then(getUserMeComplete)
            .catch(getUserMeFailed);

        function getUserMeComplete(response) {
            return response.data;
        }

        function getUserMeFailed(error) {
            var errors = exception.parseErrors(error, "Sorry, there was an error signing you up.");
            return errors;
        }
    }

    function getTags(username) {
        return $http.get(siteSettings.apiBaseUrl + '/api/v4/community/users/'+username+'/tags-breakdown')
            .then(getTagsComplete)
            .catch(getTagsFailed);

        function getTagsComplete(response) {
            return response.data;
        }

        function getTagsFailed(error) {
            var errors = exception.parseErrors(error, "Sorry, there was an error signing you up.");
            return errors;
        }
    }

    function getScoreStats(bucket) {
        return $http.get(siteSettings.apiBaseUrl + '/api/v4/buckets/' + bucket + '/score-stats')
            .then(getScoreComplete)
            .catch(getScoreFailed);

        function getScoreComplete(response) {
            return response.data;
        }

        function getScoreFailed(error) {
            var errors = exception.parseErrors(error, "Sorry, there was an error signing you up.");
            return errors;
        }
    }

    function followCareerPals(id, type, Action) {
        var deferred = $q.defer();
        var data = {};
        data.ObjectId = id;
        data.ObjectType = type;
        data.FollowingAction = Action;
        $http({
            method: 'PUT',
            url: siteSettings.apiBaseUrl + '/api/v4/community/users/me/follow',
            data: data
        }).success(function (data, status) {
            deferred.resolve(data);
        }).error(function (response) {

            var errors = exception.parseErrors(response, "Sorry, there was an error signing you up.");
            deferred.reject(errors);

        });
        return deferred.promise;
    }

    function unfollowCareerPals(id, type, Action) {
        var deferred = $q.defer();

        var data = {};
        data.ObjectId = id;
        data.ObjectType = type;
        data.FollowingAction = Action

        $http({
            method: 'PUT',
            url: siteSettings.apiBaseUrl + '/api/v4/community/users/me/unfollow',
            data: data
        }).success(function (data, status) {

            deferred.resolve(data);

        }).error(function (response) {

            var errors = exception.parseErrors(response, "Sorry, there was an error signing you up.");
            deferred.reject(errors);

        });

        return deferred.promise;
    }

    function bucketsCareerPals() {
        return $http.get(siteSettings.apiBaseUrl + '/api/v4/scoring/supported-buckets')
            .then(getBucketsComplete)
            .catch(getBucketsFailed);

        function getBucketsComplete(response) {
            return response.data;
        }

        function getBucketsFailed(error) {
            var errors = exception.parseErrors(error, "Sorry, there was an error signing you up.");
            return errors;
        }
    }

    function autocompleteLocation(term, filterType) {

            return $http.get(siteSettings.apiBaseUrl + '/jobs/Suggest', {
                params: {
                    term: term,
                    filterType: filterType
                }
            })
            .then(getAutocompleteComplete)
            .catch(getAutocompleteFailed);

        function getAutocompleteComplete(response){
            return response.data;
        }

        function getAutocompleteFailed(error){
            var errors = exception.parseErrors(error, "Sorry, there was an error trying to autocomplete location.");
            return errors;
        }
    }*/

  }
})();
