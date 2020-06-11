const cypress = require('cypress')
const fs = require('fs');
const rm = require('rimraf')
require('dotenv').config()

var recordOptions = {
  record: true,
}

var parralelOptions = {
  ciBuildId: process.env.CI_BUILD_ID,
  parallel: true,
}

var overideUrls = {
  config: {
    baseUrl: process.env.BASEURL,
    env: {
      apiUrl: process.env.APIURL
    }
  }
}

var baseOptions = {
  browser: 'chrome',
  headless: true,
  configFile: process.env.CYPRESS_CONFIG_FILE || 'config/default.config.json',
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json'
  }
}

process.env.CYPRESS_RECORD_KEY != undefined ? baseOptions = Object.assign(recordOptions, baseOptions) : console.log('This test run will NOT be recorded on the Cypress Dashboard')
process.env.PARALLEL == 'true' ? baseOptions = Object.assign(parralelOptions, baseOptions) : console.log('This test run will NOT be running in parralel')
process.env.BASEURL !=undefined ? baseOptions = Object.assign(overideUrls, baseOptions) : console.log('Using default baseUrl and apiUrl')

rm('test-results', (error) => {
  if (error) {
    console.error(`Error while removing existing report files: ${error}`)
    process.exit(1)
  }
})
console.log(baseOptions)

cypress.run(baseOptions)
  .then((results) => {
    let resultsJSON = JSON.stringify(results);
    fs.writeFileSync('test-results/cypress-run-results.json', resultsJSON);
    process.exit(results.totalFailed)
  })
  .catch((error) => {
    console.error('errors: ', error)
    process.exit(1)
  })
