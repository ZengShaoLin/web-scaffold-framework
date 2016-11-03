(function() {
    define(['app'], app => {
        app.config(config);

        config.$inject = ['$stateProvider', '$urlRouterProvider', 'components'];

        function config($stateProvider, $urlRouterProvider, components) {
            //已经加载的组件列表
            let loadedComponentList = {};

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'src/private/login.html',
                    controller: 'loginCtrl as login',
                    resolve: {
                        load: ['$rootScope', $rootScope => loadComponents($rootScope, 'login')]
                    }
                });

            $urlRouterProvider.otherwise('/login');

            //加载组件
            function loadComponents($rootScope, name) {
                const promise = new Promise(resolve => {
                    if(loadedComponentList[name]) {
                        resolve();
                    } else {
                        requirejs(components[name], () => {
                            $rootScope.$apply(() => {
                                loadedComponentList[name] = 'ok';
                                resolve();
                            });
                        });
                    }
                });
                return promise;
            }
        }
    });
})();