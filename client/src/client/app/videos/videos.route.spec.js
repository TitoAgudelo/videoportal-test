/* jshint -W117, -W030 */
describe('videos routes', function() {
  describe('state', function() {
    var view = 'app/videos/videos.html';

    beforeEach(function() {
      module('app.videos', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    // it('should map state dashboard to url / ', function() {
    //   expect($state.href('dashboard', {})).to.equal('/dashboard');
    // });

    // it('should map /dashboard route to dashboard View template', function() {
    //   expect($state.get('dashboard').templateUrl).to.equal(view);
    // });

    // it('of dashboard should work with $state.go', function() {
    //   $state.go('dashboard');
    //   $rootScope.$apply();
    //   expect($state.is('dashboard'));
    // });
  });
});
