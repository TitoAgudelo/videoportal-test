(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$state', 'routerHelper', 'logger'];
  /* @ngInject */
  function SidebarController($state, routerHelper, logger) {
   var vm = this;
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;
    vm.navRoutes = null;

    activate();

    function activate() { getNavRoutes(); }

    function getNavRoutes() {
      vm.navRoutes = states.filter(function(r) {
        return r.settings && r.settings.nav;
      }).sort(function(r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    function isCurrent(route) {

      var rootNav = getRootNav($state.current);

      if(rootNav != null) {
        return route.name == rootNav.name ? 'activeli' : '';
      }

      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }

      var menuName = route.title;
      return $state.current.title.substr(0, menuName.length) === menuName ? 'activeli' : '';
    }

    // navigates through the parents until a parent with settings is found
    // because routes with settings are shown in the navigation bar
    function getRootNav(route) {
      
      if(route.settings){
        return route;
      }

      if(route.rootNav) {
        // find that root title
        for(var i = 0; i < vm.navRoutes.length; i++) {
          if (route.rootNav == vm.navRoutes[i].name) {
            return vm.navRoutes[i];
          }  
        }
      }

      return null;
    }

    
  }
})();