// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000) // 等待5000ms，该元素可见
      // 测试登录中用户名字段
      .assert.elementPresent('input[name="username"]') // 该element存在于DOM中
      .clearValue('input[name="username"]') // 清除input的值
      .setValue('input[name="username"]', '12345')     // 给input设值
      .assert.value('input[name="username"]', '12345') // 校验input的值
      .assert.visible('.login-form .login-form-item:nth-child(1) + .error') // 错误提示可见
      .pause(3000) // 暂停

      .clearValue('input[name="username"]') // 清除input的值
      .setValue('input[name="username"]', '1234565_')
      .assert.value('input[name="username"]','1234565_')
      .assert.visible('.login-form .login-form-item:nth-child(1) + .error')
      .pause(1000)

      .clearValue('input[name="username"]')
      .setValue('input[name="username"]', '12345656523522222')
      .assert.value('input[name="username"]','12345656523522222')
      .assert.visible('.login-form .login-form-item:nth-child(1) + .error')
      .pause(1000)

      .clearValue('input[name="username"]')
      .setValue('input[name="username"]', '12345656')
      .assert.value('input[name="username"]','12345656')
      .assert.hidden('.login-form .login-form-item:nth-child(1) + .error') // 错误提示用v-show控制，hidden为不可见;用v-if控制，用elementNotPresent，不存在该DOM元素
      .pause(3000)

      // 测试登录中密码字段
      .assert.elementPresent('input[name="password"]')
      .setValue('input[name="password"]', '12345')
      .pause(3000)
      // 点击注册
      .click('.regist-btn')
      .pause(1000)
      .assert.visible('.register-wrap') // 可见
      .pause(1000)
      .assert.elementPresent('.regist-container .el-form .el-form-item:nth-child(1) .el-input__inner')
      .setValue('.regist-container .el-form .el-form-item:nth-child(1) .el-input__inner', '1234567')
      .assert.value('.regist-container .el-form .el-form-item:nth-child(1) .el-input__inner','1234567')
      .assert.elementPresent('.regist-container .el-form .el-form-item:nth-child(2) .el-input__inner')
      .setValue('.regist-container .el-form .el-form-item:nth-child(2) .el-input__inner', '1234567')
      .assert.elementPresent('.regist-container .el-form .el-form-item:nth-child(3) .el-input__inner')
      .setValue('.regist-container .el-form .el-form-item:nth-child(3) .el-input__inner', '1234567')
      .assert.elementPresent('.regist-container .el-form .el-form-item:nth-child(4) .el-input__inner')
      .setValue('.regist-container .el-form .el-form-item:nth-child(4) .el-input__inner', '1234567')
      .pause(1000)
      // 点击注册中取消按钮
      .click('.cancel-btn')
      .pause(1000)
      .assert.hidden('.register-wrap')
      .pause(5000)
      .end()
  }
}
