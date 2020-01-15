const cypress = require('cypress')
const fs = require('fs');

cypress.run({
  browser: 'chrome',
  configFile: 'config/ci.config.json',
  env: {
    foo: 'bar',
    baz: 'quux',
  }
})
.then((results) => {
    let resultsJSON = JSON.stringify(results);
    fs.writeFileSync('ci-pipeline-run-results.json', resultsJSON);
    process.exit(results.totalFailed)
  })
  .catch((error) => {
    console.error('errors: ', error)
    process.exit(1)
  })