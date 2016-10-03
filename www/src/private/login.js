(function() {
    define(['app'], function(app) {
        app.controller('loginCtrl', loginCtrl);

        loginCtrl.$inject = ['$scope'];

        function loginCtrl($scope) {
            var vm = this;
        }
    });
})();