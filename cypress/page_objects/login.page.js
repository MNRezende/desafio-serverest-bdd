class LoginPage {
  get inputEmail() { return '[data-testid="email"]'; }
  get inputSenha() { return '[data-testid="senha"]'; }
  get btnEntrar() { return '[data-testid="entrar"]'; }
  get alertMensagem() { return '.alert > span'; }

  navegar() {
    cy.visit('/');
  }

  realizarLogin(email, senha) {
    this.navegar();
    cy.get(this.inputEmail).type(email);
    cy.get(this.inputSenha).type(senha);
    cy.get(this.btnEntrar).click();
  }

  validarMensagemErro(mensagem) {
    cy.get(this.alertMensagem)
      .should('be.visible')
      .and('contain.text', mensagem);
  }
}
export default new LoginPage();