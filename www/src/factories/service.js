(function() {
    define(['app'], app => {
        app.factory('Service', Service);

        Service.$inject = ['$http', '$q'];

        function Service($http, $q) {
            const factory = {
                //获取Json资料
                getJson
            };
            return factory;

            //获取Json资料
            function getJson(name, folder) {
                let deferred = $q.defer();

                $http.get(`./json/${ folder || '' }${ name }.json`).then((data) => {
                    deferred.resolve(data.data);
                });

                return deferred.promise;
            }
        }
    });
})();