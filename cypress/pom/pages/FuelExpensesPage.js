class FuelExpenses {
    get pageHeader() {
        return cy.get('h1').contains('Fuel expenses')
    }

    get addExpenseButton() {
        return cy.get('.btn-primary')
    }  
    
    get carSelector() {
        return cy.get('.car-select-dropdown dropdown')
    }

    get vihicleField() {
        return cy.get('#addExpenseCar')
    }

    get reportDateField() {
        return cy.get('#addExpenseDate')
    }

    get mileageField() {
        return cy.get('#addExpenseMileage')
    }
    get numberOfLitersField() {
        return cy.get('#addExpenseLiters')
    }
    get totalCostField() {
        return cy.get('#addExpenseTotalCost')
    }

    get submitExpenseButton() {
        return cy.get('app-add-expense-modal .btn-primary')
    }

    visit() {
    cy.visit('/panel/expenses')
  }

  addNewExpense(brand, model, date, mileage, liters, totalCost) {
    this.addExpenseButton.click()
    this.vihicleField.contains(`${brand} ${model}`)
    this.reportDateField.clear().type(date)
    this.mileageField.clear().type(mileage)
    this.numberOfLitersField.type(liters)
    this.totalCostField.type(totalCost)
    this.submitExpenseButton.click()
  }
  verifySuccessMessageIsVisible(message) {
    cy.contains(message).should('be.visible'); 

}}

export default new FuelExpenses()

