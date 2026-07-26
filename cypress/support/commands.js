import cadastroPage from '../page_objects/cadastro.page.js';
import loginPage from '../page_objects/login.page.js';

Cypress.Commands.add('resetSession', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Cypress.Commands.add('loginAsAdmin', (email, password) => {
  loginPage.realizarLogin(email, password);
});

Cypress.Commands.add('registerUser', (name, email, password, isAdmin = false) => {
  cadastroPage.cadastrarUsuario(name, email, password, isAdmin);
});
