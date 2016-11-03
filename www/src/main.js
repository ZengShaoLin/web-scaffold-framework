(function() {
    requirejs(['main.params'], constants => {
        requirejs.config({
            paths: constants.paths,
            shim: constants.shim,
            deps: ['domReady!', 'constants/components', 'config/register', 'config/config', 'config/route', 'config/run'],
            callback(doc) {
                angular.bootstrap(doc, ['app']);
            }
        });
    });
})();
