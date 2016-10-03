// Karma configuration
// Generated on Thu Jun 02 2016 09:40:54 GMT+0800 (中国标准时间)
var constants = require('./environment/karmaConstants')();

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: constants.basePath,
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: constants.frameworks,
        // list of files / patterns to load in the browser
        files: constants.files,
        // list of files to exclude
        exclude: constants.exclude,
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: constants.preprocessors,
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],
        // web server port
        port: constants.port,
        // web server hostname
        hostname: constants.hostname,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        logLevel: config[constants.logLevel],
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: constants.browsers,
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
        // This defines how many times karma should relaunch a browser before giving up.
        retryLimit: 3,
        //ngHtml2JsPreprocessor configuration
        ngHtml2JsPreprocessor: {
            // define the first parameter of $templateCache.put
            cacheIdFromPath: function(filepath) {
                return filepath;
            },
            // define the name of angular.module
            moduleName: constants.ngHtml2JsPreprocessor.moduleName
        }
    });
};
