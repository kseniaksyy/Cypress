// Custom command to login via UI
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/')
  // Sign-in modal opens by default
  cy.contains('Sign In').should('be.visible').click()
  cy.get('#signinEmail').type(email)
  cy.get('#signinPassword').type(password)
  cy.get('.btn-primary').contains('Login').click()
  // Verify successful login (redirect to garage page)
  cy.url().should('include', '/panel/garage')
  cy.contains('Garage') // Or other element confirming login
})
