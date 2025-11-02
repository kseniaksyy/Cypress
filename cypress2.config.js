const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'sq9tsq',
  e2e: {
    //setupNodeEvents(on, config) {
    // implement node event listeners here
    //},
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space/',
    video: true,
    supportFile: 'cypress/e2e/support/e2e.js',
  },
  env: {
    AUTH_USERNAME: 'guest',
    AUTH_PASSWORD: 'welcome2qauto',
    TEST_USER_EMAIL: 'kseniia.orliuk+38@gmail.com',
    TEST_USER_PASSWORD: 'ValidPass123!'

  }
})
