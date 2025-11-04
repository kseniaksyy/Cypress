/// <reference types="cypress" />
import GaragePage from '../pom/pages/GaragePage'
import SignInForm from '../pom/forms/SignInForm'
import HomePage from '../pom/pages/HomePage'
import FuelExpensesPage from '../pom/pages/FuelExpensesPage'

describe('Expense tests with POM', () => {  
    beforeEach(() => {
        HomePage.visit()
        HomePage.openSignInForm()
        SignInForm.loginWithCredentials(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'))
        GaragePage.pageHeader.should('be.visible') 
        GaragePage.addNewCar('BMW', 'X5', '20000')
        GaragePage.verifyLastAddedCar('BMW X5')
        FuelExpensesPage.visit() 
    
})

    it('Add [BMW] [X5] expense', () => {
       FuelExpensesPage.addNewExpense('BMW', 'X5', '2.11.2025', '20500', '50', '300')
   })


})