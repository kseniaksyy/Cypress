const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'sq9tsq',
  e2e: {
    //setupNodeEvents(on, config) {
    // implement node event listeners here
    //},
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space/',
    video: true,
    supportFile: 'cypress/e2e/support/e2e.js',
  },
})
