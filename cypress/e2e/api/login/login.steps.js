import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import usuariosService from "../../../services/usuarios.service.js";
import loginService from "../../../services/login.service.js";
import { createPassword, createUniqueEmail } from "../../../support/helpers.js";

let responseContext;

Given("an existing user registered for authentication", () => {
    const emailDinamico = createUniqueEmail('login_api');
    const senhaDinamica = createPassword();

    Cypress.env("loginEmail", emailDinamico);
    Cypress.env("loginSenha", senhaDinamica);

    usuariosService.postUsuario("Miguel Login API", emailDinamico, senhaDinamica, "true")
        .as("cadastroRequisicao");
});

When("I send a POST request to log in with these credentials", () => {
    cy.get("@cadastroRequisicao").then((cadastroRes) => {
        expect(cadastroRes.status).to.eq(201);

        const email = Cypress.env("loginEmail");
        const senha = Cypress.env("loginSenha");

        loginService.postLogin(email, senha).then((loginRes) => {
            responseContext = loginRes;
        });
    });
});

Then("the login API should respond with status code 200", () => {
    expect(responseContext.status).to.eq(200);
});

Then("the response should return a valid authorization token", () => {
    expect(responseContext.body).to.have.property("message", "Login realizado com sucesso");
    expect(responseContext.body).to.have.property("authorization");
    expect(responseContext.body.authorization).to.be.a("string").and.not.be.empty;
});