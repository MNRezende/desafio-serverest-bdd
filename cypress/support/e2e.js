import './commands';
import './hooks';
import { envConfig } from './environment';

Cypress.env('envConfig', envConfig);