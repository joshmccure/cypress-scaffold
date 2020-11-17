Cypress.Commands.add('getTestElement', (selector, options = {}) => cy.get(`[data-testid="${selector}"]`, options));
