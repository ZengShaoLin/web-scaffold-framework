前端项目开发框架
================

前端项目开发框架是一套类似于[yeoman generator](https://github.com/yeoman/yeoman)的Web开发工具。

框架结合[AngularJS](https://github.com/angular/angular.js)和[RequireJS](https://github.com/requirejs/requirejs)，实现JavaScript文件的**延迟加载**，并通过Angular提供的丰富的API快速开发Web项目。

框架使用[Jasmine](https://github.com/jasmine/jasmine)和Angular Mock撰写**单元测试用例**。

框架以[NodeJS](https://nodejs.org/en/)为运行环境，使用：

* [gulp](https://github.com/gulpjs/gulp)及其丰富的插件实现**自动化进程**
* [npm](https://github.com/npm/npm)管理自动化开发组件
* [bower](https://github.com/bower/bower)管理网页开发组件
* [karma](https://github.com/karma-runner/karma)搭建单元测试环境
* [ESLint](https://github.com/eslint/eslint)检查代码规范
* [Babel](https://github.com/babel/babel)将**ES6规范转为ES5**

使用
------

使用npm全局安装[Gulp](https://github.com/gulpjs/gulp)和[UglifyJS](https://github.com/mishoo/UglifyJS2)：

    npm install gulp uglify-js -g

将项目克隆到本机上：

    git clone git@github.com:ZengShaoLin/web-scaffold-framework.git

创建新文件夹：

    mkdir my-new-project

进入项目根目录，复制所有文件（**除.git文件夹**）到新文件夹中：

    cd web-scaffold-framework
    cp -r -f ./* .babelrc .bowerrc .eslintignore .eslintrc.json .gitignore  ../my-new-project

进入新文件夹，安装组件：

    cd ../my-new-project
    npm install && bower install

**建议使用管理员权限的终端执行上述指令。**

安装完成后预览界面：

    gulp serve

Gulp 指令
------------

### ESLint
检查所有开发代码是否按照已定义的规则撰写。

    gulp esLint

### Browser Serve
将程序部署到本地指定的端口上，并在默认的浏览器中打开。改动任意的开发文件会自动刷新浏览器。

    gulp serve

可选参数：

* <code>--no-open</code>: 启动时在浏览器中不打开程序。
* <code>--no-notify</code>: 不显示提示语。
* <code>--port</code>: 指定端口号，如<code>--port=1024</code>。
* <code>--release</code>: 正式环境模式，对文件执行压缩操作，并不再监控文件改动。

### Unit Test
执行单元测试。

    gulp test

可选参数：

* <code>--no-singleRun</code>:  测试会保持监控状态，且不会结束，任何文件改动都会重新执行测试。
* <code>--browsers</code>: 定义测试运行的浏览器，可定义在多个浏览器上运行，如<code>--browsers=Chrome,Firefox</code>。

### Angular Controller
生成angular controller文件，包括.html、.js、.spec.js。生成文件前会检查文件路径，若不存在会自动创建文件夹。

    gulp ngController

必填参数：

* <code>--path</code>: 文件路径，如<code>--path=user</code>。
* <code>--name</code>: 文件名称，如<code>--name=manager</code>。

**定义文件路径时，多级目录使用<code>/</code>分开，如<code>--path=user/parent/child</code>。**

可选参数：

* <code>-d</code> 或 <code>--delete</code>: 删除文件。
* <code>-s</code> 或 <code>--service</code>: 注入Service服务。

### Angular Directive
生成angular directive文件，包括.js、.spec.js。

    gulp ngDirective

必填参数：

* <code>--name</code>: 文件名称，如<code>--name=appAddress</code>。

可选参数：

* <code>-d</code> 或 <code>--delete</code>: 删除文件。
* <code>-t</code> 或 <code>--template</code>: 为该directive创建模板，将额外生成.html、.js、.spec.js文件，即为directive创建对应的controller。

### Angular Factory
生成angular factory文件，包括.js、.spec.js。创建时会将factory名称的首字母变为大写，以表示factory为共用库。

    gulp ngFactory

必填参数：

* <code>--name</code>: 文件名称，如<code>--name=service</code>。

可选参数：

* <code>-d</code> 或 <code>--delete</code>: 删除文件。

### Angular Service
生成angular service文件，包括.js、.spec.js。创建时会将service名称的首字母变为大写，以表示service为共用库。

    gulp ngService

必填参数：

* <code>--name</code>: 文件名称，如<code>--name=cache</code>。

可选参数：

* <code>-d</code> 或 <code>--delete</code>: 删除文件。

### Angular Filter
生成angular filter文件，包括.js、.spec.js。

    gulp ngFilter

必填参数：

* <code>--name</code>: 文件名称，如<code>--name=omit</code>。

可选参数：

* <code>-d</code> 或 <code>--delete</code>: 删除文件。

### Angular Constant
生成angular constant文件，包括.js。

    gulp ngConstant

必填参数：

* <code>--name</code>: 文件名称，如<code>--name=component</code>。

可选参数：

* <code>-d</code> 或 <code>--delete</code>: 删除文件。

environment - 环境变量
-----------------------------

`gulpConstants.js`: 定义gulp任务运行时所需要的参数。

`karmaConstants.js`: 定义karma运行时所需要的参数。

**上述两个文件中的内容可以随意修改，但修改前应先了解参数的作用。**

.gitignore
------------

`www`内有许多空白文件夹，如`font`、`img`、`json`、`test`、`src/services`等，当你在这些文件夹内添加内容后，请将`.gitignore`文件删除。

**根目录中的`.gitignore`文件请勿删除。**

延迟加载
------------

所谓延迟加载，又名按需加载，就是在**需要使用该文件的时候再加载文件**。

通过amd规范和ui-router路由配置，实现在模块切换的时候，将该页面需要的文件先加载完，然后再进入模块。

下面是如何实现文件按需加载的步骤：

1. 使用Gulp指令创建文件，如`gulp ngController --path=private --name=home`。
2. 于`config/route.js`中添加路由配置代码：

        .state('home', {
            url: '/home',
            templateUrl: 'src/private/home.html',
            controller: 'homeCtrl as home',
            resolve: {
                load: ['$rootScope', $rootScope => loadComponents($rootScope, 'home')]
            }
        });

3. 于`constants/components.js`中添加模块依赖的文件数组：

        //controllers
        let components = {
            'login': ['private/login'],
            'home': ['private/home']
        };

4. 以上三步完成后，当模块切换到home时，系统会先加载`private/home.js`，完成后再进入模块。