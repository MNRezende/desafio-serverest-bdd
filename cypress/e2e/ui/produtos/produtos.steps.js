import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import produtosPage from "../../../page_objects/produtos.page.js";
import { createPassword, createUniqueEmail, createUniqueName, getFixtureData } from "../../../support/helpers.js";

let nomeProdutoDinamico;

Given("I log in with valid administrator credentials", () => {
    const emailAdminProdutos = createUniqueEmail('admin_prod');
    const senhaAdminProdutos = createPassword();

    cy.resetSession();
    cy.registerUser('Miguel Admin Produtos', emailAdminProdutos, senhaAdminProdutos, true);
    cy.loginAsAdmin(emailAdminProdutos, senhaAdminProdutos);
});

Given("I navigate to the product registration page", () => {
    produtosPage.navegarParaCadastro();
    produtosPage.validarPaginaCadastro();
});

When("I register a new product with the following details:", (dataTable) => {
    getFixtureData('product').then((dadosBase) => {
        const dados = dataTable.hashes()[0];
        nomeProdutoDinamico = createUniqueName(dados.name || dadosBase.name || 'Produto');

        produtosPage.cadastrarNovoProduto(
            nomeProdutoDinamico,
            dados.price || dadosBase.price,
            dados.description || dadosBase.description,
            dados.quantity || dadosBase.quantity
        );
    });
});

When("I try to access the product registration page without a valid session", () => {
    cy.resetSession();
    cy.visit('/cadastrarprodutos');
});

Then("the product should be visible in the inventory list", () => {
    const routes = Cypress.env('envConfig').ui.routes;
    cy.url().should("include", routes.productList);
    produtosPage.validarProdutoNaLista(nomeProdutoDinamico);
});

Then("the system should keep me on the product registration page", () => {
    const routes = Cypress.env('envConfig').ui.routes;
    cy.url().should('include', routes.products);
    produtosPage.validarPaginaCadastro();
});