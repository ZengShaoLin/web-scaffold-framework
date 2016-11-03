(function() {
    define(['app'], app => {
        describe('loginCtrl', () => {
            let $controller, $rootScope, controller, $scope;

            module.sharedInjector();

            beforeAll(module(app.name));

            beforeAll(inject((_$controller_, _$rootScope_) => {
                $controller = _$controller_;
                $rootScope = _$rootScope_;
            }));

            beforeEach(() => {
                $scope = $rootScope.$new();
                controller = $controller('loginCtrl', { $scope });
            });

            afterEach(() => {
                $scope = undefined;
                controller = undefined;
            });

            it('should be initialized', () => {
                expect(controller).toBeDefined();
            });
        });
    });
})();