/// <reference types="cypress" />
import HomePage from '../pom/pages/HomePage'
import SignInForm from '../pom/forms/SignInForm'
import GaragePage from '../pom/pages/GaragePage'
import FuelExpensesPage from '../pom/pages/FuelExpensesPage'

describe('Intercept tests', () => {
  let carId
  context('cypress POST intercept', () => {
    it('Intercept POST example', () => {
      cy.intercept('POST', '/api/cars').as('postCar')
      HomePage.visit()
      HomePage.openSignInForm()
      SignInForm.loginWithCredentials(
        'kseniia.orliuk+28@gmail.com',
        'ValidPass123!'
      )
      GaragePage.addNewCar('Porsche', '911', '567')
      cy.wait('@postCar').then((interception) => {
        expect(interception.response.statusCode).to.eq(201)
        expect(interception.request.body).to.include({
          carBrandId: 4,
          carModelId: 16,
          mileage: 567,
        })
        const id = interception.response.body.data.id
        cy.log('New car ID:', id)
        carId = id
      })
    })
  })

  context('GET all user cars', () => {
    before(() => {
      const user = {
        email: 'kseniia.orliuk+28@gmail.com',
        password: 'ValidPass123!',
      }
      cy.request('POST', '/api/auth/signin', user).then((response) => {
        expect(response.status).to.be.eq(200)
      })
    })

    it('GET - fetch all cars', () => {
      cy.request('GET', '/api/cars').then((response) => {
        expect(response.status).to.be.eq(200)
        const body = response.body.data
        expect(body[0].id).to.has.equal(carId)
      })
    })
  })

  context('POST add expense', () => {
    before(() => {
      const user = {
        email: 'kseniia.orliuk+28@gmail.com',
        password: 'ValidPass123!',
      }
      cy.request('POST', '/api/auth/signin', user).then((response) => {
        // expect(response.status).to.be.eq(200)
      })
    })
    it('POST - add new expense for car', () => {
      cy.postExpense(carId, '2025-11-03', 600, 50, 100).then((expense) => {
        cy.log(JSON.stringify(expense))
        expect(expense.carId).to.be.eq(carId)
        expect(expense.reportedAt).to.be.eq('2025-11-03')
        expect(expense.mileage).to.be.eq(600)
        expect(expense.liters).to.be.eq(50)
        expect(expense.totalCost).to.be.eq(100)
      })
    })
  })
  context('cypress GET intercept', () => {
    it('Intercept example', () => {
      cy.intercept('GET', `/api/expenses?carId=${carId}`).as('getExpenses')
      HomePage.visit()
      HomePage.openSignInForm()
      SignInForm.loginWithCredentials(
        'kseniia.orliuk+28@gmail.com',
        'ValidPass123!'
      )
      cy.get('h1').should('have.text', 'Garage')
      FuelExpensesPage.visit()
      
      cy.wait('@getExpenses').then((interception) => {
        expect(interception.response.statusCode).to.eq(200)
        const expenses = interception.response.body.data
        
        // Перевіряємо, що в масиві витрат є витрата з нашими даними
        expect(expenses).to.be.an('array')
        const foundExpense = expenses.find(exp => 
          exp.mileage === 600 && 
          exp.liters === 50 && 
          exp.totalCost === 100 &&
          exp.reportedAt === '2025-11-03'
        )
        expect(foundExpense).to.exist
        expect(foundExpense.carId).to.eq(carId)
      })
    })
  })
})
