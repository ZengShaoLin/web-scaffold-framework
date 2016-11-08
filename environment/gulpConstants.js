module.exports = function(historyApiFallback, compression) {
    var gulpConstants = {
        basePath: 'dist/',
        generator: {
            basePath: 'www/src/',
            factoryPath: 'factories/',
            constantPath: 'constants/',
            servicePath: 'services/',
            filterPath: 'filters/',
            directivePath: 'directives/',
            directiveTemplatePath: 'directiveTemplates/',
            fileOptions: {
                flag: 'wx'
            }
        },
        style: {
            src: 'www/css/*.css',
            output: 'main.css',
            dest: 'style'
        },
        image: {
            src: 'www/img/*.*',
            dest: 'img'
        },
        font: {
            src: 'www/font/*.*',
            dest: 'font'
        },
        html: {
            index: 'www/index.html',
            src: ['www/src/**/*.html'],
            dest: 'src'
        },
        json: {
            src: ['www/json/*.json', 'www/json/**/*.json'],
            dest: 'json'
        },
        js: {
            src: ['www/src/{*.js,**/*.js}', '!www/src/{*.spec.js,**/*.spec.js}'],
            test: 'www/test/*.js',
            dest: 'src'
        },
        components: {
            src: ['www/lib/**', 'node_modules/babel-polyfill/**'],
            dest: 'lib/',
            babel: 'babel-polyfill',
            minify: ['dist/lib/domReady/domReady.js', 'dist/lib/requirejs/require.js']
        },
        browser: {
            server: {
                baseDir: 'dist',
                middleware: [historyApiFallback(), compression()]
            },
            host: 'localhost',
            port: 3000,
            https: undefined,
            logPrefix: 'BS'
        },
        minify: {
            js: '-m toplevel',
            html: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            },
            css: {
                compatibility: 'ie8',
                keepSpecialComments: 0
            }
        },
        test: {
            configFile: 'karma.conf.js',
            singleRun: true
        }
    };
    return gulpConstants;
};
