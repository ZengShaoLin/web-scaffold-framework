## **angularjs-requirejs 前端系统框架**
-------------------------------------------------------------------------------------

### **简介**
-------------------------------------------------------------------------------------

* **angularjs**和**requirejs**相结合
* 使用**gulp**实现自动化进程
* 使用**npm**管理自动化开发组件
* 使用**bower**管理页面开发组件
* 使用**karma**和**jasmine**搭建测试框架
* 使用**JSHint**或**ESLint**检查代码规范

### **Gulp 自动化任务**
-------------------------------------------------------------------------------------

#### **gulp jsLint**

##### **参数**
无

##### **描述**
检查所有开发代码是否按照已定义的规则撰写。

#### **gulp esLint**

##### **参数**
无

##### **描述**
根据已经定义好的规则，检查开发代码是否出现警告或错误。

#### **gulp serve**

##### **参数**
* <code>--no-open</code>: 启动时在浏览器中不显示。
* <code>--no-notify</code>: 不显示提示语。
* <code>--port</code>: 定义端口号，如<code>--port=1024</code>。
* <code>--release</code>: 正式环境模式。
* <code>--env</code>: 定义url环境，如<code>--env=prod</code>表示使用正式环境地址，<code>--env=dev</code>表示使用测试环境地址。

##### **描述**
* 将程序部署到本地指定的端口上，并在默认的浏览器中打开。
* 改动任意的开发文件会自动刷新浏览器。

#### **gulp test**

##### **参数**
* <code>--no-singleRun</code>:  测试执行完后不会关闭。
* <code>--browsers</code>: 定义测试运行的浏览器，如<code>--browsers=Chrome,Firefox</code>。

##### **描述**
* 执行单元测试。
* 如果加上<code>--no-singleRun</code>，测试会保持监控状态，任何文件改动都会重新执行测试。
* 可定义在多个浏览器上运行单元测试，详情参见<code>--browsers</code>。

#### **gulp ngController**

##### **参数**
* <code>--path</code>: 文件路径，如<code>--path=user</code>。
* <code>--name</code>: 文件名称，如<code>--name=manager</code>。
* <code>--d</code> 或 <code>--delete</code>: 删除文件。
* <code>--s</code> 或 <code>--service</code>: 注入Service服务。

##### **描述**
* 生成angular controller文件，包括.html、.js、.spec.js。
* 如果加上<code>--d</code> 或 <code>--delete</code>，将删除相关文件。
* 定义文件路径时，多级目录使用<code>/</code>分开，如<code>--path=user/parent/child</code>。
* 生成文件前会检查文件路径，若不存在会自动创建文件夹。

#### **gulp ngDirective**

##### **参数**
* <code>--name</code>: 文件名称，如<code>--name=appAddress</code>。
* <code>--d</code> 或 <code>--delete</code>: 删除文件。
* <code>--t</code> 或 <code>--template</code>: 为该directive创建模板。

##### **描述**
* 生成angular directive文件，包括.js、.spec.js。
* 如果加上<code>--t</code> 或 <code>--template</code>，将额外生成.html、.js、.spec.js文件，即为directive额外创建对应的controller。
* 如果加上<code>--d</code> 或 <code>--delete</code>，将删除相关文件。

#### **gulp ngFactory**

##### **参数**
* <code>--name</code>: 文件名称，如<code>--name=service</code>。
* <code>--d</code> 或 <code>--delete</code>: 删除文件。

##### **描述**
* 生成angular factory文件，包括.js、.spec.js。
* 如果加上<code>--d</code> 或 <code>--delete</code>，将删除相关文件。
* 创建时会将factory名称的首字母变为大写，以表示factory为共用函数。

#### **gulp ngService**

##### **参数**
* <code>--name</code>: 文件名称，如<code>--name=cache</code>。
* <code>--d</code> 或 <code>--delete</code>: 删除文件。

##### **描述**
* 生成angular service文件，包括.js、.spec.js。
* 如果加上<code>--d</code> 或 <code>--delete</code>，将删除相关文件。
* 创建时会将service名称的首字母变为大写，以表示service为共用函数。

#### **gulp ngFilter**

##### **参数**
* <code>--name</code>: 文件名称，如<code>--name=omit</code>。
* <code>--d</code> 或 <code>--delete</code>: 删除文件。

##### **描述**
* 生成angular filter文件，包括.js、.spec.js。
* 如果加上<code>--d</code> 或 <code>--delete</code>，将删除相关文件。

#### **gulp ngConstant**

##### **参数**
* <code>--name</code>: 文件名称，如<code>--name=backend</code>。
* <code>--d</code> 或 <code>--delete</code>: 删除文件。

##### **描述**
* 生成angular constant文件，包括.js。
* 如果加上<code>--d</code> 或 <code>--delete</code>，将删除相关文件。

### **环境变量**
-------------------------------------------------------------------------------------

#### **environment/backendConstants.js**

##### **描述**
* 该文件设定在开发程序时，开发模式(dev)和生产模式(prod)的后台服务地址及相关信息。

#### **environment/gulpConstants.js**

##### **描述**
* 该文件定义gulp任务运行时所需要的参数。
* 参数可以随意修改，但请注意后果！(修改前应先了解参数的作用)

#### **environment/karmaConstants.js**

##### **描述**
* 该文件定义karma运行时所需要的参数，karma是一个测试运行环境。
* 参数可以随意修改，但请注意后果！(修改前应先了解参数的作用)