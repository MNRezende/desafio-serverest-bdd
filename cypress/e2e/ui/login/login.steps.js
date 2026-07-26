import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import cadastroPage from "../../../page_objects/cadastro.page.js";
import dashboardPage from "../../../page_objects/dashboard.page.js";
import loginPage from "../../../page_objects/login.page.js";
import { createPassword, createUniqueEmail, getFixtureData } from "../../../support/helpers.js";

let userData;

Given("I navigate to the registration page", () => {
  cadastroPage.navegar();
});

Given("I navigate to the login page", () => {
  cy.resetSession();
  loginPage.navegar();
});

When("I register a new user with valid data", () => {
  getFixtureData('user').then((fixtureUser) => {
    userData = {
      name: fixtureUser.name,
      email: createUniqueEmail('qa_bdd'),
      password: createPassword()
    };

    Cypress.env('emailCadastrado', userData.email);
    Cypress.env('senhaCadastrada', userData.password);

    cy.registerUser(userData.name, userData.email, userData.password, true);
  });
});

When("I enter credentials of a registered user", () => {
  cy.loginAsAdmin(userData.email, userData.password);
});

When("I attempt to log in with an incorrect password", () => {
  cy.loginAsAdmin(userData.email, 'SenhaIncorreta123');
});

Then("I should be redirected to the dashboard with a welcome message", () => {
  const routes = Cypress.env('envConfig').ui.routes;
  cy.url().should('include', routes.home);
  cy.get(dashboardPage.txtBoasVindas)
    .should('be.visible')
    .and('contain.text', userData.name);
});

Then("I should see the logout button available on the dashboard", () => {
  const routes = Cypress.env('envConfig').ui.routes;
  cy.url().should('include', routes.home);
  cy.get(dashboardPage.btnLogout).should('be.visible');
});

Then("the system should display the error message {string}", (errorMessage) => {
  const expectedMessage = errorMessage || Cypress.env('envConfig').ui.messages.invalidCredentials;
  loginPage.validarMensagemErro(expectedMessage);
});