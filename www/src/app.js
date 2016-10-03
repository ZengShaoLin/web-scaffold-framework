(function() {
    define([
        'ngStorage', 
        'angular-messages', 
        'angular-ui-router'
    ], function() {
        var app = angular.module('app', [
            'ui.router',
            'ngStorage',
            'ngMessages'
        ]);
        return app;
    });
})();