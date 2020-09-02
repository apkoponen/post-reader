/// <reference types="Cypress" />

import configuration from '../../fixtures/configuration';

context('Home', () => {
  before(() => {
    cy.visit(configuration.frontendUrl);
  });

  it('Next.js should be initalized', () => {
    cy.get('#__next').should('not.be.empty');
  });
});
