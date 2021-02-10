describe('google login test', () => {
  it('should log in', () => {
    cy.signin();
  });
  
  it('should log out', () => {
    cy.signout();
    cy.get('.guest-button')
  })
});