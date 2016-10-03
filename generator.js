module.exports = function(fs, gulp, argv, pathExists, constants) {

    //生成angular controller文件
    gulp.task('ngController', function() {
        //路径
        var path = argv.path || '';
        //是否注入Service
        var isInjectService = argv.s || argv.service;

        //路径不为空
        if(path) {
            //文件路径数组，创建文件夹基础路径
            var pathSplit = path.split('/'),
                folderBasePath = constants.generator.basePath.substr(0, constants.generator.basePath.length - 1);

            //遍历文件路径数组
            for(var i = 0; i < pathSplit.length; i++) {
                //叠加基础路径
                folderBasePath += '/' + pathSplit[i];

                //文件路径不存在
                if(!pathExists.sync(folderBasePath)) {
                    //创建文件夹
                    fs.mkdirSync(folderBasePath);
                }
            }
        }

        //controller基础路径，controller js路径，controller html路径，controller test路径
        var controllerPath = path ? path + '/' : path,
            jsPath = constants.generator.basePath + controllerPath + argv.name + '.js',
            htmlPath = constants.generator.basePath + controllerPath + argv.name + '.html',
            testPath = constants.generator.basePath + controllerPath + argv.name + '.spec.js';

        if(argv.d || argv.delete) {
            //删除controller js文件
            fs.unlinkSync(jsPath);
            //删除controller html文件
            fs.unlinkSync(htmlPath);
            //删除controller test文件
            fs.unlinkSync(testPath);
        } else {
            //js文件预设内容
            var jsContent = "(function() {\n"
                + "    define(['app'], function(app) {\n"
                + "        app.controller('" + argv.name + "Ctrl', " + argv.name + "Ctrl);\n\n"
                + "        " + argv.name + "Ctrl.$inject = ['$scope'" + (isInjectService ? ", 'Service'" : "") + "];\n\n"
                + "        function " + argv.name + "Ctrl($scope" + (isInjectService ? ", Service" : "") + ") {\n"
                + "            var vm = this;\n"
                + "        }\n"
                + "    });\n"
                + "})();";
            //html文件预设内容
            var htmlContent = "<div>\n" 
                + "    <!-- put you content here -->\n"
                + "</div>";
            //单元测试文件预设内容
            var testContent = "(function() {\n"
                + "    define(['app'], function(app) {\n"
                + "        describe('" + argv.name + "Ctrl', function() {\n"
                + "            var $controller, $rootScope, $scope, controller;\n\n"
                + "            module.sharedInjector();\n\n"
                + "            beforeAll(module(app.name));\n\n"
                + "            beforeAll(inject(function(_$controller_, _$rootScope_) {\n"
                + "                $controller = _$controller_;\n"
                + "                $rootScope = _$rootScope_;\n"
                + "            }));\n\n"
                + "            beforeEach(function() {\n"
                + "                $scope = $rootScope.$new();\n"
                + "                controller = $controller('" + argv.name + "Ctrl', { $scope: $scope });\n"
                + "            });\n\n"
                + "            afterEach(function() {\n"
                + "                $scope = undefined;\n"
                + "                controller = undefined;\n"
                + "            });\n\n"
                + "            it('should be initialized', function() {\n"
                + "                expect(controller).toBeDefined();\n"
                + "            });\n"
                + "        });\n"
                + "    });\n"
                + "})();";

            //生成controller js文件
            fs.writeFileSync(jsPath, jsContent, constants.generator.fileOptions);
            //生成controller html文件
            fs.writeFileSync(htmlPath, htmlContent, constants.generator.fileOptions);
            //生成controller test文件
            fs.writeFileSync(testPath, testContent, constants.generator.fileOptions);
        }
    });

    //生成angular directive文件
    gulp.task('ngDirective', function() {
        //directive文件夹路径
        var directiveFolderPath = constants.generator.basePath + constants.generator.directivePath;
        //directiveTemplate文件夹路径
        var directiveTemplateFolderPath = constants.generator.basePath + constants.generator.directiveTemplatePath;
        //directiveTemplate基础路径
        var directiveTemplateBasePath = 'src/';
        //directive js文件路径
        var jsPath = directiveFolderPath + argv.name + '.js';
        //directive test文件路径
        var testPath = directiveFolderPath + argv.name + '.spec.js';
        //是否需要template
        var isNeedTemplate = argv.template || argv.t;

        //directive文件夹不存在
        if(!pathExists.sync(directiveFolderPath)) {
            //创建文件夹
            fs.mkdirSync(directiveFolderPath);
        }

        //directiveTemplate文件夹不存在
        if(!pathExists.sync(directiveTemplateFolderPath)) {
            //创建文件夹
            fs.mkdirSync(directiveTemplateFolderPath);
        }

        //需要template
        if(isNeedTemplate) {
            //controller生成路径
            argv.path = constants.generator.directiveTemplatePath;
            //生成angular controller文件
            gulp.start('ngController');
        }

        if(argv.d || argv.delete) {
            //删除directive js文件
            fs.unlinkSync(jsPath);
            //删除directive test文件
            fs.unlinkSync(testPath);
        } else {
            //directive js内容
            var jsContent = "(function() {\n"
                + "    define(['app'], function(app) {\n"
                + "        app.directive('" + argv.name + "', " + argv.name + ");\n\n"
                + "        " + argv.name + ".$inject = [];\n\n"
                + "        function " + argv.name + "() {\n"
                + "            var directive = {\n"
                + "                restrict: 'AE',\n"
                + "                scope: {},\n"
                + (isNeedTemplate ? "                controller: '" + argv.name + "Ctrl',\n" : "")
                + (isNeedTemplate ? "                controllerAs: '" + argv.name + "',\n" : "")
                + (isNeedTemplate ? "                templateUrl: '" + directiveTemplateBasePath + constants.generator.directiveTemplatePath + argv.name + ".html',\n" : "")
                + "                link: link\n"
                + "            };\n"
                + "            return directive;\n\n"
                + "            function link(scope, element, attrs) {\n\n"
                + "            }\n"
                + "        }\n"
                + "    });\n"
                + "})();";
            //directive test内容
            var testContent = "(function() {\n"
                + "    define(['app'], function(app) {\n"
                + "        describe('directive: " + argv.name + "', function() {\n"
                + "            var $compile, $rootScope;\n\n"
                + "            beforeEach(module(app.name));\n\n"
                + "            beforeEach(inject(function(_$compile_, _$rootScope_) {\n"
                + "                $compile = _$compile_;\n"
                + "                $rootScope = _$rootScope_;\n"
                + "            }));\n\n"
                + "        });\n"
                + "    });\n"
                + "})();";

            //生成directive js文件
            fs.writeFileSync(jsPath, jsContent, constants.generator.fileOptions);
            //生成directive test文件
            fs.writeFileSync(testPath, testContent, constants.generator.fileOptions);
        }
    });

    //生成angular factory文件
    gulp.task('ngFactory', function() {
        //factory文件夹路径
        var factoryFolderPath = constants.generator.basePath + constants.generator.factoryPath;
        //factory js文件路径
        var jsPath = factoryFolderPath + argv.name + '.js';
        //factory test文件路径
        var testPath = factoryFolderPath + argv.name + '.spec.js';
        //factory名称
        var factoryName = argv.name.substr(0, 1).toUpperCase() + argv.name.substr(1, argv.name.length - 1);

        //factory文件夹不存在
        if(!pathExists.sync(factoryFolderPath)) {
            //创建文件夹
            fs.mkdirSync(factoryFolderPath);
        }

        if(argv.d || argv.delete) {
            //删除factory js文件
            fs.unlinkSync(jsPath);
            //删除factory test文件
            fs.unlinkSync(testPath);
        } else {
            //factory js内容
            var jsContent = "(function() {\n"
                + "    define(['app'], function(app) {\n"
                + "        app.factory('" + factoryName + "', " + factoryName + ");\n\n"
                + "        " + factoryName + ".$inject = [];\n\n"
                + "        function " + factoryName + "() {\n"
                + "            var factory = {\n\n"
                + "            };\n"
                + "            return factory;\n"
                + "        }\n"
                + "    });\n"
                + "})();";
            //factory test内容
            var testContent = "(function() {\n"
                + "    define(['app'], function(app) {\n"
                + "        describe('" + factoryName + "', function() {\n"
                + "            var " + factoryName + ";\n\n"
                + "            module.sharedInjector();\n\n"
                + "            beforeAll(module(app.name));\n\n"
                + "            beforeAll(inject(function(_" + factoryName + "_) {\n"
                + "                " + factoryName + " = _" + factoryName + "_;\n"
                + "            }));\n\n"
                + "            it('should be an Object', function() {\n"
                + "                expect(" + factoryName + ").toEqual(jasmine.any(Object));\n"
                + "            });\n"
                + "        });\n"
                + "    });\n"
                + "})();";

            //生成factory js文件
            fs.writeFileSync(jsPath, jsContent, constants.generator.fileOptions);
            //生成factory test文件
            fs.writeFileSync(testPath, testContent, constants.generator.fileOptions);
        }
    });

    //生成angular service文件
    gulp.task('ngService', function() {
        //service文件夹路径
        var serviceFolderPath = constants.generator.basePath + constants.generator.servicePath;
        //service js文件路径
        var jsPath = serviceFolderPath + argv.name + '.js';
        //service test文件路径
        var testPath = serviceFolderPath + argv.name + '.spec.js';
        //service名称
        var serviceName = argv.name.substr(0, 1).toUpperCase() + argv.name.substr(1, argv.name.length - 1);

        //service文件夹不存在
        if(!pathExists.sync(serviceFolderPath)) {
            //创建文件夹
            fs.mkdirSync(serviceFolderPath);
        }

        if(argv.d || argv.delete) {
            //删除service js文件
            fs.unlinkSync(jsPath);
            //删除service test文件
            fs.unlinkSync(testPath);
        } else {
            //service js内容
            var jsContent = "(function() {\n"
                + "    define(['app'], function(app) {\n"
                + "        app.service('" + serviceName + "', " + serviceName + ");\n\n"
                + "        " + serviceName + ".$inject = [];\n\n"
                + "        function " + serviceName + "() {\n"
                + "            var vm = this;\n"
                + "        }\n"
                + "    });\n"
                + "})();";
            //service test内容
            var testContent = "(function() {\n"
                + "    define(['app'], function(app) {\n"
                + "        describe('" + serviceName + "', function() {\n"
                + "            var " + serviceName + ";\n\n"
                + "            module.sharedInjector();\n\n"
                + "            beforeAll(module(app.name));\n\n"
                + "            beforeAll(inject(function(_" + serviceName + "_) {\n"
                + "                " + serviceName + " = _" + serviceName + "_;\n"
                + "            }));\n\n"
                + "            it('should be an Object', function() {\n"
                + "                expect(" + serviceName + ").toEqual(jasmine.any(Object));\n"
                + "            });\n"
                + "        });\n"
                + "    });\n"
                + "})();";

            //生成service js文件
            fs.writeFileSync(jsPath, jsContent, constants.generator.fileOptions);
            //生成service test文件
            fs.writeFileSync(testPath, testContent, constants.generator.fileOptions);
        }
    });

    //生成angular filter文件
    gulp.task('ngFilter', function() {
        //filter文件夹路径
        var filterFolderPath = constants.generator.basePath + constants.generator.filterPath;
        //js文件路径
        var jsPath = filterFolderPath + argv.name + '.js';
        //test文件路径
        var testPath = filterFolderPath + argv.name + '.spec.js';

        //filter文件夹不存在
        if(!pathExists.sync(filterFolderPath)) {
            //创建文件夹
            fs.mkdirSync(filterFolderPath);
        }

        if(argv.d || argv.delete) {
            //删除filter js文件
            fs.unlinkSync(jsPath);
            //删除filter test文件
            fs.unlinkSync(testPath);
        } else {
            //filter js内容
            var jsContent = "(function() {\n"
                + "    define(['app'], function(app) {\n"
                + "        app.filter('" + argv.name + "', " + argv.name + ");\n\n"
                + "        " + argv.name + ".$inject = [];\n\n"
                + "        function " + argv.name + "() {\n"
                + "            return function(data) {\n\n"
                + "            };\n"
                + "        }\n"
                + "    });\n"
                + "})();";
            //filter 单元测试内容
            var testContent = "(function() {\n"
                + "    define(['app'], function(app) {\n"
                + "        describe('" + argv.name + "', function() {\n"
                + "            var $filter, filter;\n\n" 
                + "            module.sharedInjector();\n\n"
                + "            beforeAll(module(app.name));\n\n"
                + "            beforeAll(inject(function(_$filter_) {\n"
                + "                $filter = _$filter_;\n"
                + "            }));\n\n"
                + "            beforeEach(function() {\n"
                + "                filter = $filter('" + argv.name + "');\n"
                + "            });\n\n"
                + "            afterEach(function() {\n"
                + "                filter = undefined;\n"
                + "            });\n\n"
                + "            it('should be initialized', function() {\n"
                + "                expect(filter).toBeDefined();\n"
                + "            });\n"
                + "        });\n"
                + "    });\n"
                + "})();";

            //生成filter js文件
            fs.writeFileSync(jsPath, jsContent, constants.generator.fileOptions);
            //生成filter test文件
            fs.writeFileSync(testPath, testContent, constants.generator.fileOptions);
        }
    });

    //生成angular constant文件
    gulp.task('ngConstant', function() {
        //constant文件夹路径
        var constantFolderPath = constants.generator.basePath + constants.generator.constantPath;
        //constant js文件路径
        var jsPath = constantFolderPath + argv.name + '.js';

        //constant文件夹不存在
        if(!pathExists.sync(constantFolderPath)) {
            //创建文件夹
            fs.mkdirSync(constantFolderPath);
        }

        if(argv.d || argv.delete) {
            //删除constant js文件
            fs.unlinkSync(jsPath);
        } else {
            //constant js内容
            var jsContent = "(function() {\n"
                + "    define(['app'], function(app) {\n"
                + "        app.constant('" + argv.name + "', {});\n"
                + "    });\n"
                + "})();";

            //生成constant js文件
            fs.writeFileSync(jsPath, jsContent, constants.generator.fileOptions);
        }
    });
    
};