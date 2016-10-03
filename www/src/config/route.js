(function() {
    define(['app'], function(app) {
        app.config(config);

        config.$inject = ['$stateProvider', '$urlRouterProvider', 'components'];

        function config($stateProvider, $urlRouterProvider, components) {
            //已经加载的组件列表
            var loadedComponentList = [];

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'src/private/login.html',
                    controller: 'loginCtrl as login',
                    resolve: {
                        load: ['$q', '$rootScope', function($q, $rootScope) {
                            return loadComponents($q, $rootScope, 'login');
                        }]
                    }
                });

            $urlRouterProvider.otherwise('/login');

            //加载组件
            function loadComponents($q, $rootScope, name) {
                var deferred = $q.defer();

                if (loadedComponentList.indexOf(name) >= 0) {
                    deferred.resolve('Require Components Finished');
                } else {
                    require(components[name], function() {
                        $rootScope.$apply(function() {
                            loadedComponentList.push(name);
                            deferred.resolve('Require Components Finished');
                        });
                    });
                }

                return deferred.promise;
            }
        }
    });
})();