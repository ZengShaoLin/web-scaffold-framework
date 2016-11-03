define(() => {
    const requirejsConstants = {
        paths: {
            'angular': '../lib/angular/angular.min',
            'angular-mocks': '../lib/angular-mocks/angular-mocks',
            'angular-messages': '../lib/angular-messages/angular-messages.min',
            'angular-ui-router': '../lib/angular-ui-router/release/angular-ui-router.min',
            'ngStorage': '../lib/ngstorage/ngStorage.min',
            'domReady': '../lib/domReady/domReady'
        },
        shim: {
            'angular': { exports: 'angular' },
            'angular-mocks': ['angular'],
            'angular-messages': ['angular'],
            'angular-ui-router': ['angular'],
            'ngStorage': ['angular']
        } 
    };
    return requirejsConstants;
});
