const fs = require("fs");
const path = require("path");
const { defineConfig } = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const mochawesome = require("cypress-mochawesome-reporter/plugin");

const envFilePath = path.resolve(__dirname, "cypress.env.json");
let runtimeEnv = {};

if (fs.existsSync(envFilePath)) {
  try {
    runtimeEnv = JSON.parse(fs.readFileSync(envFilePath, "utf8"));
  } catch (error) {
    console.warn(`Unable to parse ${envFilePath}:`, error.message);
  }
}

const environment = process.env.CYPRESS_ENVIRONMENT || runtimeEnv.environment || "development";
const environmentSettings = {
  development: {
    baseUrl: "https://front.serverest.dev",
    apiUrl: "https://serverest.dev"
  },
  staging: {
    baseUrl: process.env.CYPRESS_BASE_URL || runtimeEnv.baseUrl || "https://front.serverest.dev",
    apiUrl: process.env.CYPRESS_API_URL || runtimeEnv.apiUrl || "https://serverest.dev"
  },
  production: {
    baseUrl: process.env.CYPRESS_BASE_URL || runtimeEnv.baseUrl || "https://front.serverest.dev",
    apiUrl: process.env.CYPRESS_API_URL || runtimeEnv.apiUrl || "https://serverest.dev"
  }
};

const selectedEnv = environmentSettings[environment] || environmentSettings.development;
const baseUrl = process.env.CYPRESS_BASE_URL || runtimeEnv.baseUrl || selectedEnv.baseUrl;
const apiUrl = process.env.CYPRESS_API_URL || runtimeEnv.apiUrl || selectedEnv.apiUrl;

module.exports = defineConfig({
  retries: {
    runMode: 2,
    openMode: 0
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true
  },
  e2e: {
    baseUrl,
    specPattern: "cypress/e2e/**/*.feature",
    screenshotsFolder: "cypress/screenshots",
    screenshotOnRunFailure: true,
    env: {
      apiUrl,
      environment,
      baseUrl
    },
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      mochawesome(on);

      on(
        "file:preprocessor",
        webpack({
          webpackOptions: {
            resolve: { extensions: [".js", ".ts"] },
            module: {
              rules: [
                {
                  test: /\.feature$/,
                  use: [
                    {
                      loader: "@badeball/cypress-cucumber-preprocessor/webpack",

                      options: config
                    }
                  ],
                },
              ],
            },
          },
        })
      );
      return config;
    },
  },
});