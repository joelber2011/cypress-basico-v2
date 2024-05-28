Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Joelber')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('joelber@teste.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})