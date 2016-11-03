(function() {
    define(['app'], app => {
        app.run(run);

        run.$inject = ['$rootScope'];

        function run($rootScope) {
            //路由跳转监控
            $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, options) => {
                
            });
        }
    });
})();
