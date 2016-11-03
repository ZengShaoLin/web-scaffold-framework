(function() {
    define(['app'], app => {
        describe('Service', () => {
            let Service;

            module.sharedInjector();

            beforeAll(module(app.name));

            beforeAll(inject((_Service_) => {
                Service = _Service_;
            }));

            it('should be an Object', () => {
                expect(Service).toEqual(jasmine.any(Object));
            });
        });
    });
})();