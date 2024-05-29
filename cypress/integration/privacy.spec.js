Cypress._.times(5, () => {
    it('Testa a página da poliítica de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')

        cy.contains('Talking About Testing').should('be.visible')
    })
})