export const createUniqueEmail = (prefix = 'qa') => `${prefix}_${Date.now()}@desafio.com`;

export const createUniqueName = (prefix = 'Usuário') => `${prefix} ${Date.now()}`;

export const createPassword = () => 'Senha@123';

export const getFixtureData = (fixtureName) => cy.fixture(`test-data.json`).then((data) => data[fixtureName]);
