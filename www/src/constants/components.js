(function() {
    define(['app'], app => {
        //共用组件
        const commonComponents = ['factories/service'];
        //controllers
        let components = {
            'login': ['private/login']
        };

        angular.forEach(components, (value, key) => {
            components[key] = value.concat(commonComponents);
        });
        
        app.constant('components', components);
    });
})();