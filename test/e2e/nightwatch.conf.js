require('babel-register')
var config = require('../../config')

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  // 测试代码目录
  src_folders: ['test/e2e/specs/'],
  // 测试报告输出
  output_folder: 'test/e2e/reports',
  // 自定义断言路径
  custom_assertions_path: ['test/e2e/custom-assertions'],

  // selenium server相关设置
  selenium: {
    start_process: true, //是否启用 selenium自启动
    server_path: require('selenium-server').path, // selenium jar 包路径
    host: '127.0.0.1',// 设置 selenium 监听地址
    port: 4444,// 设置 selenium 监听端口
    // 一系列传递给 selenium 的命令行参数
    cli_args: {
      // Nightwatch 在 Chrome 上运行测试,ChromeDriver 路径
      'webdriver.chrome.driver': require('chromedriver').path,
    }
  },

  // 与测试相关的测试
  test_settings: {
    default: {
      selenium_port: 4444,// 指定 selenium server 接受的 端口
      selenium_host: 'localhost',// 指定 selenium server 接受的 hostname/IP
      silent: true, // 是否显示selenium命令日志
      // 测试代码中可访问的全局变量
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      }
    },

    chrome: {
      // 启动服务的参数配置
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true, // 是否启动js
        acceptSslCerts: true,
        chromeOptions: {
          // 配置模拟的设备
          mobileEmulation: {
            'deviceName': 'iPad'
          }
        }
      }
    }
  }
}
