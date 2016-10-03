(function() {
    define(['app'], function(app) {
        //共用组件
        var commonComponents = ['factories/service'];
        //controllers
        var components = {
            'login': ['private/login']
        };

        angular.forEach(components, function(value, key) {
           angular.forEach(commonComponents, function(item, i) {
                value.push(item);
            });
        });
        
        app.constant('components', components);
    });
})();