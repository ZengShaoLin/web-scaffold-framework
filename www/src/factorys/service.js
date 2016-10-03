(function() {
    define(['app'], function(app) {
        app.factory('Service', Service);

        Service.$inject = ['$http', '$q'];

        function Service($http, $q) {
            var factory = {
                //获取Json资料
                getJson: getJson
            };
            return factory;

            //获取Json资料
            function getJson(name, folder) {
                var deferred = $q.defer();

                $http.get('./json/' + (folder || '') + name + '.json').then(function(data) {
                    deferred.resolve(data.data);
                });

                return deferred.promise;
            }
        }
    });
})();