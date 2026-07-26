export const envConfig = {
  environment: Cypress.env('environment') || 'development',
  ui: {
    baseUrl: Cypress.config('baseUrl'),
    routes: {
      home: '/home',
      login: '/',
      registration: '/cadastrarusuarios',
      products: '/cadastrarprodutos',
      productList: '/listarprodutos',
      users: '/listarusuarios'
    },
    messages: {
      invalidCredentials: 'Email e/ou senha inválidos'
    }
  },
  api: {
    baseUrl: Cypress.env('apiUrl') || Cypress.config('env').apiUrl
  }
};
