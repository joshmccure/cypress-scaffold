const cypress = require('cypress')
const fs = require('fs');
const rm = require('rimraf')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid');

rm('test-results', (error) => {
  if (error) {
      console.error(`Error while removing existing report files: ${error}`)
      process.exit(1)
  }
  console.log('Removing all existing report files successfully!')
})

cypress.run({
  browser: 'chrome',
  headless: true,
  configFile: 'config/ci.config.json',
  record: true,
  group: 'E2E',
  tag: 'Test Environment',
  ciBuildId: `${process.env.AUTHOR}-${process.env.EXECUTION_ENVIRONMENT}-${uuidv4()}`,
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