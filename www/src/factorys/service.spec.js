(function() {
    define(['app'], function(app) {
        describe('Service', function() {
            var Service;

            module.sharedInjector();

            beforeAll(module(app.name));

            beforeAll(inject(function(_Service_) {
                Service = _Service_;
            }));

            it('should be an Object', function() {
                expect(Service).toEqual(jasmine.any(Object));
            });
        });
    });
})();