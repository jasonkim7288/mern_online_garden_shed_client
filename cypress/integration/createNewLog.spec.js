import { getRandomCharacter } from './utilities';

// sign in -> create a new record -> go to my plant record -> selet the first record -> create new log -> create

describe('creaet a new log', () => {
  before(() => {
    cy.createPlantRecord();
    cy.get('[data-cy=button-create-log]').click();
  });

  beforeEach(() => {
    // clear the input text for every test
    cy.get('[data-cy=my-notes]').clear(); 
  })

  after(() => {
    cy.signout();
  });

  it('should focus on the input text box', () => {
    cy.get('[data-cy=my-notes]').focused()
  });
  
  it('should see error message if the input string is more than 1000 characters', () => {
    cy.get('[data-cy=my-notes]').fireEvent('change', getRandomCharacter(1001));
    cy.get('[data-cy=submit-create-log]').click();
    cy.get('.err-msg');
  });
  
  it('should go to the plant record page if the submit succeeds', () => {
    cy.get('[data-cy=my-notes]').type('This is the description');
    cy.get('[data-cy=submit-create-log]').click();
    cy.get('.err-msg').should('not.exist');
    cy.get('.my-notes');
  });
  
});