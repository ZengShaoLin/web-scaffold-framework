module.exports = function(historyApiFallback) {
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
            src: ['www/test/*.js', 'www/src/*.js', 'www/src/**/*.js'],
            dest: 'src'
        },
        components: {
            src: 'www/lib/**',
            dest: 'lib',
            minify: ['dist/lib/domReady/domReady.js', 'dist/lib/requirejs/require.js']
        },
        browser: {
            server: {
                baseDir: 'dist',
                middleware: [historyApiFallback()]
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
