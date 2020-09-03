/// <reference types="Cypress" />

import configuration from '../../fixtures/configuration';
import { e2eIds as loginFormIds } from '../../../src/modules/login/LoginForm';
import { e2eIds as homeIds } from '../../../src/pages/HomePage';

function e2eSelector(id: string) {
  return `[data-e2e=${id}]`;
}

context('Home', () => {
  before(() => {
    cy.visit(configuration.frontendUrl);
  });

  it('Should be able to login', () => {
    cy.get(e2eSelector(loginFormIds.loginForm)).should('exist');
    cy.get(e2eSelector(loginFormIds.nameField)).type('E2E Test User');
    cy.get(e2eSelector(loginFormIds.emailField)).type('e2e@example.com');
    cy.get(e2eSelector(loginFormIds.loginForm)).submit();
    cy.get(e2eSelector(homeIds.loggedIn)).should('exist');
  });
});
