import { getRandomCharacter } from './utilities';

// sign in -> go to create new record -> search plant -> select one -> add 
describe('search for a plant', () => {
  before(() => {
    // sign in first
    cy.signin();
    cy.gotoCreateRecord();
  });
  
  beforeEach(() => {
    // clear the input text for every test
    cy.get('.input-content').clear(); 
  })
  
  after(() => {
    cy.signout();
  });
  
  it('should focus on the input text box', () => {
    cy.get('.input-content').focused();
  });
  
  it('should see error message if submitted with an empty string', () => {
    cy.get('[data-cy=submit-plant-search]').click();
    cy.get('.err-msg-search');
    cy.get('.no-results').should('not.exist');
    cy.get('.summary-wrapper').should('not.exist');
  });

  it('should see no result as the result of the wrong search keywords', () => {
    cy.get('.input-content').type('asdfjeijfeijf');
    cy.get('[data-cy=submit-plant-search]').click();
    cy.get('.err-msg-search').should('not.exist');
    cy.get('.no-results');
    cy.get('.summary-wrapper').should('not.exist');
  });
  
  it('should see the plants list as the result of the search keywords', () => {
    cy.searchCorrectPlant();
    cy.get('.err-msg-search').should('not.exist');
    cy.get('.no-results').should('not.exist');
    cy.get('.summary-wrapper');
  });
});

// after selecting one of the searched plants list, test to create a plant record
describe('create new record after selecting one of the searched plants list', () => {
  before(() => {
    // sign in first
    cy.signin();
    cy.gotoCreateRecord();
    cy.searchCorrectPlant();
    cy.get('.summary-wrapper').eq(0).click();
  });
  
  beforeEach(() => {
    // clear the input text for every test
    cy.get('.description-input').clear(); 
  })
  
  after(() => {
    cy.signout();
  });

  it('should see selected the plant\'s info and focus on the input text box', () => {
    cy.get('.err-msg-search').should('not.exist');
    cy.get('.no-results').should('not.exist');
    cy.get('.summary-wrapper').should('not.exist');
    cy.get('.description-input').focused();
  });
  
  it('should see error message if the input string is more than 1000 characters', () => {
    cy.get('.description-input').fireEvent('change', getRandomCharacter(1001));
    cy.get('[data-cy=submit-create-plant-record]').click();
    cy.get('.err-msg-description')
  });
  
  it('should go to the plant record page if the submit succeeds', () => {
    cy.get('.description-input').type('This is the description');
    cy.get('[data-cy=submit-create-plant-record]').click();
    cy.get('.err-msg-description').should('not.exist');
    cy.get('[data-cy=button-create-log]');
  });
  
});