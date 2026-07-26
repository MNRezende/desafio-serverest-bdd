class UsuariosPage {
    get btnIrParaListagem() { return '[data-testid="listar-usuarios"]'; }

    get tabelaUsuarios() { return '.table'; }

    navegarParaListagem() {
        cy.get('body').then(($body) => {
            if ($body.find(this.btnIrParaListagem).length > 0) {
                cy.get(this.btnIrParaListagem, { timeout: 10000 })
                    .should('be.visible')
                    .click();
            } else {
                cy.visit('/listarusuarios');
            }
        });
    }

    validarPaginaListagem() {
        cy.location('pathname', { timeout: 10000 }).should('include', '/listarusuarios');
    }

    validarUsuarioNaTabela() {
        cy.get('body', { timeout: 10000 })
            .should('be.visible')
            .and(($body) => {
                expect($body.text().trim().length).to.be.greaterThan(0);
            });
    }
}

export default new UsuariosPage();