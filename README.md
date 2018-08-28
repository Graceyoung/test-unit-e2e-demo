# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# 单元测试说明
框架：jest + vue-test-utils

jest配置：https://jestjs.io/docs/en/configuration

vue-test-utils(用于写测试代码的工具库): https://vue-test-utils.vuejs.org/zh/

依赖的第三方的库或框架，在写测试时，需在挂载组件时，引入，参考unit/specs/Login.spec.js


测试报告说明

% Stmts是语句覆盖率（statement coverage）：是否每个语句都执行了？

% Branch分支覆盖率（branch coverage）：是否每个if代码块都执行了？

% Funcs函数覆盖率（function coverage）：是否每个函数都调用了？

% Lines行覆盖率（line coverage）：是否每一行都执行了？


# e2e测试说明
框架：nightwatchjs + selenium

写测试代码的API（断言）：http://nightwatchjs.org/api

nightwatch配置：http://nightwatchjs.org/gettingstarted#settings-file

selenium：自动化测试环境，它提供了测试服务器、启动浏览器、网页自动操作等功能，同时暴露 API 给 Nightwatch 供我们使用
          selenium是一个.jar后缀的文件，需要有java的运行环境，java -version查看是否按照Java
          官网：http://www.selenium.org.cn/

# nightwatch.conf.js中配置Chrome模拟移动设备，测试用例（test/e2e/specs/test.js）中的click失效,解决方案
.waitForElementVisible('.regist-btn', 1000)

.execute(selector => {
  document.querySelector(selector).click();
}, ['.regist-btn'])

.moveToElement('.regist-btn', 0, 0)

.mouseButtonClick(0)

