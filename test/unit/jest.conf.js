const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  // 文件扩展名
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  // 主要用于与webpack的resolve.alias匹配，注意正则写法
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // 增加transform转换
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  // 转换时需要忽略的文件
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e'
  ],
  // 配置快照测试
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  // 运行测试前可运行的脚本
  setupFiles: ['<rootDir>/test/unit/setup'],
  // 输出覆盖信息文件的目录
  coverageDirectory: '<rootDir>/test/unit/coverage',
  // 哪些文件需要收集覆盖率信息
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**'
  ],
  // 运行环境下的url，默认about:blank，此处增加这个是因为用到vue-test-utils，vue-test-utils要运行在浏览器环境下(Jest 默认使用了 js-dom 来模拟浏览器环境)
  testURL:"http://localhost"
}
