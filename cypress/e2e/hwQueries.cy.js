/// <reference types="cypress" />

describe('search elements', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('search buttons in header', () => {
    it('verifies buttons in header', () => {
      cy.get('header').find('button').should('have.length', 4).and('be.visible')
      cy.get('header').find('button').as('headerButtons')
      cy.get('@headerButtons').eq(0).should('have.text', 'About')
      cy.get('@headerButtons').eq(1).should('have.text', 'Contacts')
      cy.get('@headerButtons').eq(2).should('have.text', 'Guest log in')
      cy.get('@headerButtons').last().should('have.text', 'Sign In')

      cy.get('a.btn.header-link').contains('Home').should('be.visible') 
    })
  })

  context('search buttons and links in footer', () => {
    it('by first, eq, and last', () => {
    cy.get('.socials_link').as('socialLinks')
    cy.get('@socialLinks').first().should('have.attr', 'href', 'https://www.facebook.com/Hillel.IT.School')
    cy.get('@socialLinks').eq(1).should('have.attr', 'href', 'https://t.me/ithillel_kyiv')
    cy.get('@socialLinks').eq(2).should('have.attr','href','https://www.youtube.com/user/HillelITSchool?sub_confirmation=1')
    cy.get('@socialLinks').eq(3).should('have.attr', 'href', 'https://www.instagram.com/hillel_itschool/')
    cy.get('@socialLinks').last().should('have.attr', 'href', 'https://www.linkedin.com/school/ithillel/')
  })

  it('finds and verifies contacts links', () => {
      cy.get('.contacts_link').as('contactsLinks');
      cy.get('@contactsLinks').should('have.length', 2).and('be.visible');
      cy.get('@contactsLinks').first().should('have.text', 'ithillel.ua');
      cy.get('@contactsLinks').last().should('have.text', 'support@ithillel.ua');
    });
  });
})