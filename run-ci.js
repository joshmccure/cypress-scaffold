const cypress = require('cypress')
const fs = require('fs');
const uuidv1 = require('uuid/v1');

cypress.run({
  browser: 'chrome',
  headless: true,
  configFile: 'config/ci.config.json',
  reporter: 'mochawesome',
  parallel: true,
  record: true,
  group: 'Pipeline',
  reporterOptions: {
    reportDir: 'ci-results/mochawesome-report',
    reportFilename: uuidv1(),
    overwrite: false,
    html: false,
    json: true
  }
})
.then((results) => {
    let resultsJSON = JSON.stringify(results);
    fs.writeFileSync('ci-results/cypress-run-results.json', resultsJSON);
    process.exit(results.totalFailed)
  })
  .catch((error) => {
    console.error('errors: ', error)
    process.exit(1)
  })