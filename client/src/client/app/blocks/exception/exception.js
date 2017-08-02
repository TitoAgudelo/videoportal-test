(function () {
  'use strict';

  angular
    .module('blocks.exception')
    .factory('exception', exception);

  /* @ngInject */
  function exception($q, logger, siteSettings) {
    var service = {
      catcher: catcher,
      parseErrors: parseErrors
    };
    return service;

    function catcher(message) {
      return function (e) {
        var thrownDescription;
        var newMessage;
        if (e.data && e.data.description) {
          thrownDescription = '\n' + e.data.description;
          newMessage = message + thrownDescription;
        }
        e.data.description = newMessage;
        
        if (siteSettings.environment == 'dev') {
          logger.error(newMessage);
        } else {
          console.log(newMessage);
        }

        return $q.reject(e);
      };
    }

    /**projects errors from WebAPI ModelState info to Field,Error dictionary */
    function parseErrors(data, defaultMessage) {
      var errors = [];
      for (var key in data.ModelState) {
        for (var i = 0; i < data.ModelState[key].length; i++) {
          errors.push({
            field: key,
            error: data.ModelState[key][i]
          });
        }
      }

      if (errors.length == 0 && defaultMessage) {
        errors.push({
          field: "Error",
          error: defaultMessage
        });
      }

      return errors;
    }
  }
})();
