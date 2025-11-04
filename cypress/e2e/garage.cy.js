/// <reference types="cypress" />
import GaragePage from '../pom/pages/GaragePage'
import SignInForm from '../pom/forms/SignInForm'
import HomePage from '../pom/pages/HomePage'

describe('Garage tests with POM', () => {  
    beforeEach(() => {
        HomePage.visit()
        HomePage.openSignInForm()
        SignInForm.loginWithCredentials(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'))
        //GaragePage.visit()
        GaragePage.pageHeader.should('be.visible')  
    
})

    it('Add [Audi] [A6] car', () => {
        GaragePage.addNewCar('Audi', 'A6', '15000')
        GaragePage.verifyLastAddedCar('Audi A6')
    })


})
