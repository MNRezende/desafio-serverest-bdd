class CadastroPage {
  get inputNome() { return '[data-testid="nome"]'; }
  get inputEmail() { return '[data-testid="email"]'; }
  get inputSenha() { return '[data-testid="password"]'; }
  get checkboxAdmin() { return '[data-testid="checkbox"]'; }
  get btnCadastrar() { return '[data-testid="cadastrar"]'; }

  navegar() {
    cy.visit('/cadastrarusuarios');
  }

  cadastrarUsuario(nome, email, senha, isAdmin = false) {
    this.navegar();
    cy.get(this.inputNome).type(nome);
    cy.get(this.inputEmail).type(email);
    cy.get(this.inputSenha).type(senha);
    if (isAdmin) {
      cy.get(this.checkboxAdmin).check();
    }
    cy.get(this.btnCadastrar).click();
  }
}
export default new CadastroPage();