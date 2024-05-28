/// <reference types="Cypress" />
describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, '
        cy.get('#firstName').type('Joelber')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('joelber@teste.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Joelber')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('joelber@teste,com')
        cy.get('#open-text-area').type('Exercício extra')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('número de telefone deve ser numérico, se não, campo continuará em branco', function () {
        cy.get('#phone').type('abcd')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Joelber')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('joelber@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Exercício extra')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Joelber').should('have.value', 'Joelber').clear().should('have.value', '')
        cy.get('#lastName').type('Santos').should('have.value', 'Santos').clear().should('have.value', '')
        cy.get('#email').type('joelber@teste.com').should('have.value', 'joelber@teste.com').clear().should('have.value', '')
        cy.get('#phone').type('123456789').should('have.value', '123456789').clear().should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value', 'feedback')
    });

    //testa a seleção de seleção do tipo radio ou checkbox
    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    });



    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    });


})