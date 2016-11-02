module.exports = {
  root: true,
  parser: 'babel-eslint',
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
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
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
    'componentHandler': true,
    'ajax': true,
    'ActiveXObject': true,
    'AMap': true,
    'env': true,
    'rm': true,
    'mkdir': true,
    'cp': true
  }
}
