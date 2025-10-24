/// <reference types="cypress" />

describe('Positive tests for Registration', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('Registration popup', () => {
    it('Successful Registration', () => {
      cy.get('.hero-descriptor_btn').click()
      cy.get('.modal-title').should('have.text', 'Registration')
      cy.get('#signupName').type('Kseniia')
      cy.get('#signupLastName').type('Orliuk')
      cy.get('#signupEmail').type(`kseniia.orliuk+${Date.now()}@gmail.com`)
      cy.get('#signupPassword').type('ValidPass123!')
      cy.get('#signupRepeatPassword').type('ValidPass123!')
      cy.get('.btn-primary').should('not.be.disabled')
      cy.contains('Register').click()
      cy.contains('Registration complete').should('be.visible')
    })
  })
})

describe('Negative tests for Registration', () => {
  beforeEach(() => {
    cy.visit('/')
})

context('Registration popup', () => {
  it('Name field', () => {
    cy.get('.hero-descriptor_btn').click()
    cy.get('#signupName').focus().blur()
    cy.get('#signupName + .invalid-feedback')
      .should('have.text', 'Name required')
      .should('be.visible')
    cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
    cy.get('#signupName').type('12345')
    cy.get('#signupName + .invalid-feedback')
      .should('have.text', 'Name is invalid')
      .should('be.visible')
    cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
    cy.get('#signupName').clear()
    cy.get('#signupName').type('A')
    cy.get('#signupName + .invalid-feedback')
      .should('have.text', 'Name has to be from 2 to 20 characters long')
      .should('be.visible')
    cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
    cy.get('#signupName').clear()
    cy.get('#signupName').type('KseniiaPrincessOfUkrainianKingdom')
    cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
  })
  it('Surname field', () => {
    cy.get('.hero-descriptor_btn').click()
    cy.get('#signupLastName').focus().blur()
    cy.get('#signupLastName + .invalid-feedback')
      .should('have.text', 'Last name required')
      .should('be.visible')
    cy.get('#signupLastName').should(
      'have.css',
      'border-color',
      'rgb(220, 53, 69)'
    )
    cy.get('#signupLastName').type('12345')
    cy.get('#signupLastName + .invalid-feedback')
      .should('have.text', 'Last name is invalid')
      .should('be.visible')
    cy.get('#signupLastName').should(
      'have.css',
      'border-color',
      'rgb(220, 53, 69)'
    )
    cy.get('#signupLastName').clear()
    cy.get('#signupLastName').type('A')
    cy.get('#signupLastName + .invalid-feedback')
      .should('be.visible')
      .should('have.text', 'Last name has to be from 2 to 20 characters long')
    cy.get('#signupLastName').should(
      'have.css',
      'border-color',
      'rgb(220, 53, 69)'
    )
    cy.get('#signupLastName').clear()
    cy.get('#signupLastName').type('KseniiaPrincessOfUkrainianKingdom')
    cy.get('#signupLastName + .invalid-feedback')
    cy.get('#signupLastName').should(
      'have.css',
      'border-color',
      'rgb(220, 53, 69)'
    )
  })
  it('Email field', () => {
    cy.get('.hero-descriptor_btn').click()
    cy.get('#signupEmail')
      .focus()
      .blur()
      .should('have.css', 'border-color', 'rgb(220, 53, 69)')
    cy.get('#signupEmail + .invalid-feedback')
      .should('be.visible')
      .should('have.text', 'Email required')
    cy.get('#signupEmail').clear().type('invalidemail').blur()
    cy.get('#signupEmail').should(
      'have.css',
      'border-color',
      'rgb(220, 53, 69)'
    )
    cy.contains('Email is incorrect').should('be.visible')
    cy.get('#signupEmail').clear().type('user@').blur()
    cy.get('#signupEmail').should(
      'have.css',
      'border-color',
      'rgb(220, 53, 69)'
    )
    cy.contains('Email is incorrect').should('be.visible')
  })
  it('Password field', () => {
    cy.get('.hero-descriptor_btn').click()
    cy.get('#signupPassword')
      .focus()
      .blur()
      .should('have.css', 'border-color', 'rgb(220, 53, 69)')
    cy.get('#signupPassword + .invalid-feedback')
      .should('be.visible')
      .should('have.text', 'Password required')
    const invalidPasswords = [
      'abcdefg1',
      'ABCDEFG1',
      'Abcdefgh',
      'Ab1',
      'Abcdefghijklmnop1',
    ]

    invalidPasswords.forEach((pw) => {
      cy.get('#signupPassword').clear().type(pw).blur()
      cy.get('#signupPassword').should(
        'have.css',
        'border-color',
        'rgb(220, 53, 69)'
      )

      cy.get('#signupPassword + .invalid-feedback')
        .should('be.visible')
        .should(
          'contain.text',
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        )
    })
  })
  it('Re-enter password field', () => {
    cy.get('.hero-descriptor_btn').click()
    cy.get('#signupRepeatPassword')
      .focus()
      .blur()
      .should('have.css', 'border-color', 'rgb(220, 53, 69)')
    cy.get('#signupRepeatPassword + .invalid-feedback')
      .should('be.visible')
      .should('have.text', 'Re-enter password required')
    cy.get('#signupPassword').type('ValidPass123!')
    cy.get('#signupRepeatPassword')
      .type('Differentpass1!')
      .blur()
      .should('have.css', 'border-color', 'rgb(220, 53, 69)')
    cy.get('#signupRepeatPassword + .invalid-feedback')
      .should('be.visible')
      .should('have.text', 'Passwords do not match')
  })
  it('Extended login() func', () => {
    cy.login('kseniia.orliuk+28@gmail.com', 'ValidPass123!')
  })
})
})
