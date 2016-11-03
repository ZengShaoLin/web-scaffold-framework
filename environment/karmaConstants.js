module.exports = function() {
    var karmaConstants = {
        basePath: 'www',
        frameworks: ['jasmine', 'requirejs'],
        files: [
            { pattern: 'lib/**', included: false },
            { pattern: 'src/*.js', included: false },
            { pattern: 'src/**/*.js', included: false },
            { pattern: 'test/*.spec.js', included: false },
            { pattern: 'src/**/*.html', included: false },
            { pattern: 'json/*.json', included: false },
            '../node_modules/babel-polyfill/dist/polyfill.min.js',
            'src/main.spec.js'
        ],
        exclude: [
            'src/main.js',
            'src/config/register.js'
        ],
        preprocessors: {
            'src/**/*.html': ['ng-html2js'],
            'src/*.js': ['babel'],
            'src/**/*.js': ['babel'],
            'test/*.spec.js': ['babel']
        },
        port: 9876,
        hostname: 'localhost',
        logLevel: 'LOG_INFO', // LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG
        browsers: ['PhantomJS'], // Chrome, Firefox, Safari, PhantomJS, Opera, IE
        ngHtml2JsPreprocessor: {
            moduleName: 'app'
        },
        babelPreprocessor: {
            options: {
                babelrc: true
            }
        }
    };
    return karmaConstants;
};
