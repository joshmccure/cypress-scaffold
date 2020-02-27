const cypress = require('cypress')
const fs = require('fs');
const rm = require('rimraf')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid');

var CI_BUILD_ID;
process.env.CI == 'true' ? CI_BUILD_ID = `Github-Actions-CI-${process.env.GITHUB_SHA}` : CI_BUILD_ID = `${process.env.AUTHOR}-${process.env.EXECUTION_ENVIRONMENT}-${uuidv4()}`

console.log(CI_BUILD_ID)

rm('test-results', (error) => {
  if (error) {
    console.error(`Error while removing existing report files: ${error}`)
    process.exit(1)
  }
})

cypress.run({
  browser: 'chrome',
  headless: true,
  configFile: 'config/ci.config.json',
  record: true,
  group: 'E2E',
  parallel: true,
  tag: 'Test Environment',
  ciBuildId: CI_BUILD_ID,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'test-results/test-report',
    reportFilename: uuidv4(),
    overwrite: false,
    html: false,
    json: true
  }
})
  .then((results) => {
    let resultsJSON = JSON.stringify(results);
    fs.writeFileSync('test-results/cypress-run-results.json', resultsJSON);
    process.exit(results.totalFailed)
  })
  .catch((error) => {
    console.error('errors: ', error)
    process.exit(1)
  })