(function() {
    //先配置requirejs的根地址
    requirejs.config({
            baseUrl: '/base/src'
    });

    requirejs(['main.params'], function(constants) {
        // 所有开发文件
        var devFiles = [];
        // 1. 匹配所有开头包含/base/src/或结尾包含.spec.js的文件 2. i表示不区分大小写
        var DEV_REGEXP = /^\/base\/src\/|\.spec\.js$/i; 
        // 1. 不需要开头包含/base/src/main的文件 2. i表示不区分大小写
        var IGNORE_FILES_REGEXP = /^\/base\/src\/main\.+/i; 
        // 1. 替换开头的/base/src/和结尾的.js内容 2. g表示全局搜索
        var SRC_REPLACE_REGEXP = /^\/base\/src\/|\.js$/g;
        // 1. 替换开头的/base内容 2. g表示全局搜索
        var TEST_REPLACE_REGEXP = /^\/base/g; 

        //找出所有需要加载的开发文件
        Object.keys(window.__karma__.files).forEach(function(file) {
            if(!IGNORE_FILES_REGEXP.test(file) && DEV_REGEXP.test(file)) {
                devFiles.push(file.replace(SRC_REPLACE_REGEXP, '').replace(TEST_REPLACE_REGEXP, '..'));
            }
        });

        //后配置requirejs的其他设置
        requirejs.config({
            paths: constants.paths,
            shim: constants.shim,
            deps: ['angular-mocks', 'app'],
            callback: function() {
                requirejs(devFiles, window.__karma__.start);
            }
        });
    });
})();
