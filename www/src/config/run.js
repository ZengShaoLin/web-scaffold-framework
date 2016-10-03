(function() {
    define(['app'], function(app) {
        app.run(run);

        run.$inject = ['$rootScope'];

        function run($rootScope) {
            //路由跳转监控
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
                
            });
        }
    });
})();
