/* jshint -W117, -W030 */
describe('layout', function() {
  describe('sidebar', function() {
    var controller;
    var views = {
      profile: 'app/profile/profile.html',
    };

    beforeEach(function() {
      module('app.layout', bard.fakeToastr);
      bard.inject('$controller', '$httpBackend', '$location',
        '$rootScope', '$state', 'routerHelper');
    });

    beforeEach(function() {
      routerHelper.configureStates(mockData.getMockStates(), '/profile');
      controller = $controller('SidebarController');
      $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    // it('should have isCurrent() for /profile to return `current`', function() {
    //   $location.path('/profile');
    //   expect(controller.isCurrent($state.current)).to.equal('activeli');
    // });

    // it('should have isCurrent() for non route not return `current`', function() {
    //   $location.path('/invalid');
    //   expect(controller.isCurrent({ title: 'invalid' })).not.to.equal('activeli');
    // });
  });
});
