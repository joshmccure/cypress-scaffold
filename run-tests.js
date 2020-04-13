const cypress = require('cypress')
const fs = require('fs');
const rm = require('rimraf')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
var config = require('./config/ci.config'); //with path

const baseUrl = process.env.CYPRESS_BASE_URL || config.baseUrl
const parallel = process.env.PARALLEL || false

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
  config: {
    baseUrl: baseUrl
  },
  record: true,
  group: 'E2E',
  parallel: true,
  tag: `${baseUrl}`,
  ciBuildId: CI_BUILD_ID,
  parallel: parallel,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json'
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