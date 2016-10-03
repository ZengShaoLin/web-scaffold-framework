(function() {
    requirejs(['main.params'], function(constants) {
        requirejs.config({
            paths: constants.paths,
            shim: constants.shim,
            deps: ['domReady!', 'constants/components', 'config/register', 'config/config', 'config/route', 'config/run'],
            callback: function(doc) {
                angular.bootstrap(doc, ['app']);
            }
        });
    });
})();
