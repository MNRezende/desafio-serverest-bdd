import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import usuariosService from "../../../services/usuarios.service.js";
import loginService from "../../../services/login.service.js";
import produtosService from "../../../services/produtos.service.js";
import { createPassword, createUniqueEmail, createUniqueName } from "../../../support/helpers.js";

const testData = require('../../../fixtures/test-data.json');

let authToken;
let responseContext;

Given("I am authenticated as an administrator via API", () => {
    const emailAdmin = createUniqueEmail('prod_admin');
    const senhaAdmin = createPassword();

    usuariosService.postUsuario("Admin Produtos API", emailAdmin, senhaAdmin, "true")
        .then((cadastroRes) => {
            expect(cadastroRes.status).to.eq(201);

            loginService.postLogin(emailAdmin, senhaAdmin).then((loginRes) => {
                authToken = loginRes.body.authorization;
            });
        });
});

When("I send a POST request to register a product with dynamic data", () => {
    const nomeProduto = createUniqueName('Produto API');

    produtosService.postProduto(
        authToken,
        nomeProduto,
        testData.product.price,
        testData.product.description,
        testData.product.quantity
    )
        .then((response) => {
            responseContext = response;
        });
});

When("I send a POST request to register a product without authentication", () => {
    const nomeProduto = createUniqueName('Produto API');

    produtosService.postProduto(
        null,
        nomeProduto,
        testData.product.price,
        testData.product.description,
        testData.product.quantity
    )
        .then((response) => {
            responseContext = response;
        });
});

Then("the product API should respond with status code 201", () => {
    expect(responseContext.status).to.eq(201);
});

Then("the product API should respond with status code 401", () => {
    expect(responseContext.status).to.eq(401);
});

Then("the response body should confirm product creation", () => {
    expect(responseContext.body).to.have.property('message', 'Cadastro realizado com sucesso');
    expect(responseContext.body).to.have.property('_id');
});

Then("the response body should indicate that authentication is required", () => {
    expect(responseContext.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
});