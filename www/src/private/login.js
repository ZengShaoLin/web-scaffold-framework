(function() {
    define(['app'], app => {
        app.controller('loginCtrl', loginCtrl);

        loginCtrl.$inject = ['$scope'];

        function loginCtrl($scope) {
            let vm = this;
        }
    });
})();