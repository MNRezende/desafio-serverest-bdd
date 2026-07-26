import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import usuariosPage from "../../../page_objects/usuarios.page.js";
import { createPassword, createUniqueEmail, createUniqueName } from "../../../support/helpers.js";

let emailUsuarioDinamico;
let nomeUsuarioDinamico;

Given("I log in with valid administrator credentials for user management", () => {
    nomeUsuarioDinamico = createUniqueName('Miguel Listagem');
    emailUsuarioDinamico = createUniqueEmail('list_user');
    const senhaUsuario = createPassword();

    cy.resetSession();
    cy.registerUser(nomeUsuarioDinamico, emailUsuarioDinamico, senhaUsuario, true);
    cy.resetSession();
    cy.loginAsAdmin(emailUsuarioDinamico, senhaUsuario);
});

When("I navigate to the user management list", () => {
    usuariosPage.navegarParaListagem();
    usuariosPage.validarPaginaListagem();
});

When("I attempt to access the user management list without a valid session", () => {
    cy.resetSession();
    cy.visit('/listarusuarios');
});

Then("I should see the registered user displayed in the table", () => {
    usuariosPage.validarUsuarioNaTabela();
});

Then("the system should keep me on the user list page", () => {
    const routes = Cypress.env('envConfig').ui.routes;
    cy.url().should('include', routes.users);
    usuariosPage.validarPaginaListagem();
});