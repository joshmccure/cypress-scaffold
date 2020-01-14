## 🚀 Get Up and Running


### Install the dependencies

Once you have cloned the repository:

1. Open your terminal
2. Run `npm i` to install the dependencies

### Run Tests with [Cypress.io](https://docs.cypress.io/)

##### Running Tests with a Headed Browser
1. Enter the following command to open the Cypress Test Runner:

   `npm run cy:open`

2. Once opened, you can select which tests to run:

##### Running Tests with a Headless Browser
1. Enter the following command to run tests with headless chrome:

   `npm run cy:run`

## ⚠️ Troubleshooting Failures

### Test(s) are failing intermittently

If you notice tests failing intermittently, try debug them locally with `cy:open` in chrome with the console open.

1. Reproduce the failure
2. Find the line where the test fails
3. Find the root cause of the failure

If it looks like it's failing to wait for an element, try waiting for the element to be visible `cy.get('#my-element').should('be.visible')`

If it looks like it's failing from changing test data, try to make sure your tests don't rely on built up state, you can read about this [here.](https://docs.cypress.io/guides/references/best-practices.html#Having-tests-rely-on-the-state-of-previous-tests)

### Test(s) are failing in the CI Pipeline
If you notice tests are failing in the CI pipeline but aren't failing on your local machine, try to reproduce the CI test run as it does on CI.

1. build the cypress docker image
2. run your tests on the cypress container headlessly

## 🤝 Contributing

This project uses the PR process to review and test changes before they're merged in to the master branch. Anyone can submit a pull request.

### Opening a PR

For any kind of change to files in this repo, you can follow the below steps.

- Create a new branch with a descriptive name. Eg. `test/new-user`

- Run `npm i` to ensure you have all the latest depedencies installed. If you're updating dependencies in `package.json`

- Once you have completed the changes you want to push, run the linting, ensure the tests pass headlessly, as they run on CI this way:

  `npm run lint`  
  `npm run cy:run`

- Once all linting and the tests are passing, add your changes and commit them to your branch with commitizen.

  `git add <files>`  
  `npm run commit`

- Select the appropriate type of commit with commitizen and push your changes to your branch.  
  `git push origin test/new-user`

- Open a PR to merge your branch in to `master`.

- Once all tests in CI are passing, submit the PR for review.

- When at least one person has approved the PR, go ahead and merge it in to `master`. After the branch has been merged, ensure it is deleted.

### Who can review and approve a PR?

Anyone! Please make sure that all the linting and tests are passing before approval.


## 🚢 Continuous Integration Pipeline


#### View the CI Pipeline

To view the CI Pipeline latest runs go [here.](https://github.com/joshpzero/cypress-scaffold)
