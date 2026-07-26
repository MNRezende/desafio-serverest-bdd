import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import usuariosService from "../../../services/usuarios.service.js";
import { createUniqueEmail } from "../../../support/helpers.js";

const testData = require('../../../fixtures/test-data.json');

let responseContext;

When("I send a POST request to register a dynamic user", () => {
    const emailDinamico = createUniqueEmail('api_qa');

    usuariosService.postUsuario(testData.user.name, emailDinamico, testData.user.password, "true")
        .then((response) => {
            responseContext = response;
        });
});

When("I send a POST request to register a user with an existing email", () => {
    usuariosService.postUsuario(testData.user.name, testData.user.existingEmail, testData.user.password, "true")
        .then((response) => {
            responseContext = response;
        });
});

When("I send a POST request to register a user without a password", () => {
    usuariosService.postUsuario(testData.user.name, createUniqueEmail('api_no_password'), '', "true")
        .then((response) => {
            responseContext = response;
        });
});

Then("the user API should respond with status code 201", () => {
    expect(responseContext.status).to.eq(201);
});

Then("the user API should respond with status code 400", () => {
    expect(responseContext.status).to.eq(400);
});

Then("the response body should contain a success message and an ID", () => {
    expect(responseContext.body).to.have.property('message', 'Cadastro realizado com sucesso');
    expect(responseContext.body).to.have.property('_id');
});

Then("the response body should indicate that the email is already registered", () => {
    expect(responseContext.body).to.have.property('message', 'Este email já está sendo usado');
});

Then("the response body should indicate that the password is required", () => {
    expect(responseContext.body).to.have.property('password');
});