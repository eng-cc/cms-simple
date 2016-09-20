// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    browser
    .url('http://localhost:8080')
      .waitForElementVisible('body', 8000)
      .assert.elementPresent('.container')
      .assert.containsText('h3', '云家园 信息服务平台')
      .assert.elementCount('input', 3)
      .end()
  }
}
