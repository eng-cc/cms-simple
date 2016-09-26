module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // eqeqeq: 要求使用 === 和 !==
    'eqeqeq': 2,
    // no-alert: 禁用 alert、confirm 和 prompt
    'no-alert': 2,
    // no-native-reassign: 禁止对原生对象赋值
    'no-native-reassign': 2,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  // 全局变量
  'env': {
    'node':true,
    'amd': true,
    'jquery': true,
    'es6': true,
    'browser': true,
    'commonjs': true
  },
  // 一些全局变量
  'globals': {
    'router': true,
    'ActiveXObject': true,
    'AMap': true,
    'env': true,
    'rm': true,
    'mkdir': true,
    'cp': true
  }
}
