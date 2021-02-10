import { fireEvent } from '@testing-library/react';

Cypress.Commands.add("signin", () => {
  cy.visit(`?access_token=${Cypress.env('accessToken')}`);
  cy.get('.title').contains('All Garden Sheds');
  cy.wait(2000);
});

Cypress.Commands.add("gotoCreateRecord", () => {
  cy.get('[data-cy=mobile-menu]').click();
  cy.get('[data-cy=mobile-menu-create-record]').click();
});

Cypress.Commands.add("searchCorrectPlant", () => {
  cy.get('.input-content')
    .type('rose');
  cy.get('[data-cy=submit-plant-search]').click();
});

Cypress.Commands.add("createPlantRecord", () => {
  cy.signin();
  cy.gotoCreateRecord();
  cy.searchCorrectPlant();
  cy.get('.summary-wrapper').eq(0).click();
  cy.get('[data-cy=submit-create-plant-record]').click();
  cy.wait(2000);
});

// if you just use .type() with a long text, it will timeout after 4000ms, so change it to the event firing
Cypress.Commands.add('fireEvent', {prevSubject: true}, (element, event, value) => {
  element.focus()
  fireEvent[event](element[0], { target: { value } });
})

Cypress.Commands.add("signout", () => {
  cy.get('[data-cy=mobile-menu]').click();
  cy.wait(1000);
  cy.get('[data-cy=sign-out]').click();
});
