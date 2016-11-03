(function() {
    define([
        'ngStorage', 
        'angular-messages', 
        'angular-ui-router'
    ], () => {
        const app = angular.module('app', [
            'ui.router',
            'ngStorage',
            'ngMessages'
        ]);
        return app;
    });
})();