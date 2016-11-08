var fs = require('fs');     //file system
var gulp = require('gulp');
var babel = require('gulp-babel');
var gulpIf = require('gulp-if');
var watch = require('gulp-watch'); //watch files
var esLint = require('gulp-eslint'); //identifying and reporting on patterns found in JavaScript code
var uglify = require('gulp-uglify-cli');    //minify js
var cleanCSS = require('gulp-clean-css');   //minify css
var htmlmin = require('gulp-htmlmin');  //minify html
var concat = require('gulp-concat'); //combine files
var imagemin = require('gulp-imagemin'); //minify images
var compression = require('compression'); //gzip files
var historyApiFallback = require('connect-history-api-fallback'); //resolve html5Mode problem: refresh page will receive 404
var browserSync = require('browser-sync').create();
var _ = require('lodash');
var pathExists = require('path-exists');    //check file exist or not
// var lazypipe = require('lazypipe'); //create reusable pipelines
var karmaServer = require('karma').Server; //test tool
var constants = require('./environment/gulpConstants')(historyApiFallback, compression);
//argv parameters used by gulp tasks
//gulp serve: --no-open, --no-notify, --port
//gulp test: --no-singleRun, --browsers
//gulp ngController: --service, -s
//gulp ngDirective: --template, --t
//发布正式版: --release
//删除angular生成文件: --d, --delete
//定义文件路径: --path
//定义文件名称: --name
var argv = require('yargs').argv;

//加载生成文件tasks
require('./generator')(fs, gulp, argv, pathExists, constants);

//使用eslint检查js代码
gulp.task('esLint', function() {
    var lintFiles = constants.js.src.concat(constants.js.test);

    lintFiles.map(function(value, index) {
        lintFiles[index] = value.replace('!', '');
    });

    return gulp.src(lintFiles)
        .pipe(esLint())
        .pipe(esLint.format())
        .pipe(esLint.failAfterError());
});

//生成dist文件夹
gulp.task('dist', ['style', 'font', 'img', 'html', 'index', 'js', 'json', argv.release ? 'minifyComponents' : 'components']);

gulp.task('style', function() {
    return gulp.src(constants.style.src)
        .pipe(concat(constants.style.output))
        .pipe(gulpIf(argv.release, cleanCSS(constants.minify.css)))
        .pipe(gulp.dest(constants.basePath + constants.style.dest));
});

gulp.task('font', function() {
    return gulp.src(constants.font.src)
        .pipe(gulp.dest(constants.basePath + constants.font.dest));
});

gulp.task('img', function() {
    return gulp.src(constants.image.src)
        .pipe(gulpIf(argv.release, imagemin()))
        .pipe(gulp.dest(constants.basePath + constants.image.dest));
});

gulp.task('html', function() {
    return gulp.src(constants.html.src)
        .pipe(htmlmin(constants.minify.html))
        .pipe(gulp.dest(constants.basePath + constants.html.dest));
});

gulp.task('index', function() {
    return gulp.src(constants.html.index)
        .pipe(htmlmin(constants.minify.html))
        .pipe(gulp.dest(constants.basePath));
});

gulp.task('js', function() {
    return gulp.src(constants.js.src)
        .pipe(babel({ babelrc: true }))
        .pipe(gulpIf(argv.release, uglify(constants.minify.js)))
        .pipe(gulp.dest(constants.basePath + constants.js.dest));
});

gulp.task('json', function() {
    return gulp.src(constants.json.src)
        .pipe(gulp.dest(constants.basePath + constants.json.dest));
});

gulp.task('components', function() {
    return gulp.src(constants.components.src)
        .pipe(gulp.dest(function(file) {
            var isBabel = file.base.indexOf(constants.components.babel) >= 0;
            return constants.basePath + constants.components.dest + (isBabel ? constants.components.babel : '');
        }));
});

gulp.task('minifyComponents', ['components'], function() {
    return gulp.src(constants.components.minify)
        .pipe(uglify(constants.minify.js))
        .pipe(gulp.dest(function(file) {
            return file.base.replace(__dirname + '\\', '');
        }));
});

//定义监控事件
gulp.task('styleWatch', ['style'], function() {
    browserSync.reload();
});
gulp.task('imgWatch', ['img'], function() {
    browserSync.reload();
});
gulp.task('fontWatch', ['font'], function() {
    browserSync.reload();
});
gulp.task('htmlWatch', ['html'], function() {
    browserSync.reload();
});
gulp.task('indexWatch', ['index'], function() {
    browserSync.reload();
});
gulp.task('jsWatch', ['js'], function() {
    browserSync.reload();
});
gulp.task('jsonWatch', ['json'], function() {
    browserSync.reload();
});
gulp.task('componentsWatch', ['components'], function() {
    browserSync.reload();
});

//在浏览器上运行
gulp.task('serve', [argv.release ? 'dist' : 'filesWatch'], function() {
    browserSync.init({
        server: constants.browser.server,
        host: constants.browser.host,
        port: argv.port || constants.browser.port,
        https: constants.browser.https,
        ghostMode: false,
        logPrefix: constants.browser.logPrefix,
        open: _.isUndefined(argv.open) ? true : argv.open,
        notify: _.isUndefined(argv.notify) ? true : argv.notify
    });
});

//监控服务
gulp.task('filesWatch', ['dist'], function() {
    watch(constants.style.src, function() {
        gulp.start('styleWatch');
    });
    watch(constants.image.src, function() {
        gulp.start('imgWatch');
    });
    watch(constants.font.src, function() {
        gulp.start('fontWatch');
    });
    watch(constants.html.src, function() {
        gulp.start('htmlWatch');
    });
    watch(constants.html.index, function() {
        gulp.start('indexWatch');
    });
    watch(constants.js.src, function() {
        gulp.start('jsWatch');
    });
    watch(constants.json.src, function() {
        gulp.start('jsonWatch');
    });
    watch(constants.components.src, function() {
        gulp.start('componentsWatch');
    });
});

//执行单元测试
gulp.task('test', function() {
    var karmaOptions = {
        configFile: __dirname + '/' + constants.test.configFile,
        singleRun: _.isUndefined(argv.singleRun) ? constants.test.singleRun : argv.singleRun
    };

    if(!_.isUndefined(argv.browsers)) {
        karmaOptions.browsers = argv.browsers.split(',');
    }

    new karmaServer(karmaOptions, function(exitCode) {
        process.exit();
    }).start();
});