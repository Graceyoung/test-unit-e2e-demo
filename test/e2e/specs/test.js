// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  '测试登录字段': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 3000) // 等待3000ms，该元素可见
      .pause(1000)
      // LANDSCAPE|PORTRAIT
      /*.setOrientation('LANDSCAPE',function (obj) {
        this.assert.equal(obj.orientation,'LANDSCAPE');
      })
      .pause(1000)*/
      // 测试登录中用户名字段
      .verify.elementPresent('input[name="username"]') // 该element存在于DOM中
      .clearValue('input[name="username"]') // 清除input的值
      .setValue('input[name="username"]', '12345')     // 给input设值
      .verify.value('input[name="username"]', '12345') // 校验input的值
      .verify.visible('.login-form .login-form-item:nth-child(1) + .error') // 错误提示可见
      .pause(3000) // 暂停

      .clearValue('input[name="username"]') // 清除input的值
      .setValue('input[name="username"]', '1234565_')
      .verify.value('input[name="username"]','1234565_')
      .verify.visible('.login-form .login-form-item:nth-child(1) + .error')
      .pause(1000)

      .clearValue('input[name="username"]')
      .setValue('input[name="username"]', '12345656523522222')
      .verify.value('input[name="username"]','12345656523522222')
      .verify.visible('.login-form .login-form-item:nth-child(1) + .error')
      .pause(1000)

      .clearValue('input[name="username"]')
      .setValue('input[name="username"]', '12345656')
      .verify.value('input[name="username"]','12345656')
      .verify.hidden('.login-form .login-form-item:nth-child(1) + .error') // 错误提示用v-show控制，hidden为不可见;用v-if控制，用elementNotPresent，不存在该DOM元素
      .pause(3000)

      // 测试登录中密码字段
      .verify.elementPresent('input[name="password"]')
      .setValue('input[name="password"]', '12345')
      .pause(3000)
  },
  '测试注册字段': function (browser) {
    // 点击注册
    // .click('.regist-btn')
    // 解决移动端click不兼容问题
    browser
      .waitForElementVisible('.regist-btn', 1000)
      .execute(selector => {
        document.querySelector(selector).click();
      }, ['.regist-btn'])
      .moveToElement('.regist-btn', 0, 0)
      .mouseButtonClick(0)

      .pause(1000)
      // assert 和verify的区别： assert——测试失败跳出，verify——测试失败继续执行后面的
      .assert.visible('.register-wrap') // 可见
      .pause(1000)
      .verify.elementPresent('.regist-container .el-form .el-form-item:nth-child(1) .el-input__inner')
      .setValue('.regist-container .el-form .el-form-item:nth-child(1) .el-input__inner', '1234567')
      .verify.value('.regist-container .el-form .el-form-item:nth-child(1) .el-input__inner','1234567')
      .verify.elementPresent('.regist-container .el-form .el-form-item:nth-child(2) .el-input__inner')
      .setValue('.regist-container .el-form .el-form-item:nth-child(2) .el-input__inner', '1234567')
      .verify.elementPresent('.regist-container .el-form .el-form-item:nth-child(3) .el-input__inner')
      .setValue('.regist-container .el-form .el-form-item:nth-child(3) .el-input__inner', '1234567')
      .verify.elementPresent('.regist-container .el-form .el-form-item:nth-child(4) .el-input__inner')
      .setValue('.regist-container .el-form .el-form-item:nth-child(4) .el-input__inner', '1234567')
      .pause(1000)
      // 点击注册中取消按钮
      // .click('.cancel-btn')
      .execute(selector => {
        document.querySelector(selector).click();
      }, ['.cancel-btn'])
      .moveToElement('.cancel-btn', 0, 0)
      .mouseButtonClick(0)

      .pause(1000)
      .verify.hidden('.register-wrap')
      .pause(3000)
      .end()
  }
}
