class GaragePage {
  get addedCarNames() {
    return cy.get('.car-item')
  }

  get pageHeader() {
    return cy.contains('h1', 'Garage')
  }
  get addNewCarButton() {
    return cy.get('div.panel-page_heading .btn-primary')
  }

  get brandDropdown() {
    return cy.get('#addCarBrand')
  }
  get modelDropdown() {
    return cy.get('#addCarModel')
  }
  get milesageField() {
    return cy.get('#addCarMileage')
  }

  get submitAddingFormButton() {
    return cy.get('app-add-car-modal .btn-primary')
  }

  get addNewCarFormHeader() {
    return cy.get('.modal-header')
  }

  visit() {
    cy.visit('/panel/garage')
  }

  addNewCar(brand, model, mileage) {
    this.addNewCarButton.click()
    this.brandDropdown.select(brand)
    this.modelDropdown.select(model)
    this.milesageField.type(mileage)
    this.submitAddingFormButton.click()
  }
  verifyLastAddedCar(carName) {
    this.addedCarNames.first().should('contain', carName) 
  }
}

export default new GaragePage()
