/// <reference types="cypress" />
import HomePage from '../pom/pages/HomePage'
import SignInForm from '../pom/forms/SignInForm'

describe('Sign in tests with POM', () => {
  beforeEach(() => {
    HomePage.visit()
    HomePage.openSignInForm()
  })
  it('Successful Sign in', () => {
    SignInForm.loginWithCredentials('kseniia.orliuk+28@gmail.com', 'ValidPass123!') 
    cy.get('h1').should('have.text', 'Garage')
  })

  it('Sign in without email', () => {
    SignInForm.triggerErrorMessageForField('email')
    SignInForm.enterPassword('Qwerty1!') 
    SignInForm.verifyLoginButtonIsDisabled()
    SignInForm.verifyErrorMessageForFieldIsVisible('email')
  })

  it('Sign in without password', () => {
    SignInForm.triggerErrorMessageForField('password')
    SignInForm.enterEmail('kseniia.orliuk+28@gmail.com') 
    SignInForm.verifyLoginButtonIsDisabled()
    SignInForm.verifyErrorMessageForFieldIsVisible('password')
  })

  it('Sign in with invalid email', () => {
    SignInForm.enterEmail('kseniia.orliuk') 
    SignInForm.enterPassword('ValidPass123!') 
    SignInForm.verifyLoginButtonIsDisabled()
    SignInForm.verifyIncorrectEmailMessageIsVisible()
  
  })

  it('Sign in with incorrect credentials', () => {
    SignInForm.loginWithCredentials('kseniia.orliuk12345@gmail.com', 'ValidPqwertyass123!')
    SignInForm.verifyWrongDataMessageIsVisible()
  })
})

// describe.skip('Sign in tests without POM', () => {
//   beforeEach(() => {
//     cy.visit('/')
//     cy.get('.header_signin').click()
//   })
//   it('Successful Sign in', () => {
//     cy.get('#signinEmail').type('kseniia.orliuk+28@gmail.com')
//     cy.get('#signinPassword').type('ValidPass123!')
//     cy.get('app-signin-modal .btn-primary').click()
//     cy.get('h1').should('have.text', 'Garage')
//   })

//   it('Sign in without email', () => {
//     cy.get('#signinEmail').focus().blur()
//     cy.get('#signinPassword').type('ValidPass123!')
//     cy.get('app-signin-modal .btn-primary').should('be.disabled')
//     cy.contains('Email required').should('be.visible')
//   })

//   it('Sign in without password', () => {
//     cy.get('#signinEmail').type('kseniia.orliuk+28@gmail.com')
//     cy.get('#signinPassword').focus().blur()
//     cy.get('app-signin-modal .btn-primary').should('be.disabled')
//     cy.contains('Password required').should('be.visible')
//   })

//   it('Sign in with invalid email', () => {
//     cy.get('#signinEmail').type('kseniia.orliuk')
//     cy.get('#signinPassword').type('ValidPass123!')
//     cy.get('app-signin-modal .btn-primary').should('be.disabled')
//     cy.contains('Email is incorrect').should('be.visible')
//   })

//   it('Sign in with incorrect credentials', () => {
//     cy.get('#signinEmail').type('kseniia.orliuk12345@gmail.com')
//     cy.get('#signinPassword').type('ValidPqwertyass123!')
//     cy.get('app-signin-modal .btn-primary').click()
//     cy.contains('Wrong email or password').should('be.visible')
//   })
// })
