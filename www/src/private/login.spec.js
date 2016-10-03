(function() {
    define(['app'], function(app) {
        describe('loginCtrl', function() {
            var $controller, $rootScope,
                controller, $scope;

            module.sharedInjector();

            beforeAll(module(app.name));

            beforeAll(inject(function(_$controller_, _$rootScope_) {
                $controller = _$controller_;
                $rootScope = _$rootScope_;
            }));

            beforeEach(function() {
                $scope = $rootScope.$new();
                controller = $controller('loginCtrl', { $scope: $scope });
            });

            afterEach(function() {
                $scope = undefined;
                controller = undefined;
            });

            it('should be initialized', function() {
                expect(controller).toBeDefined();
            });
        });
    });
})();