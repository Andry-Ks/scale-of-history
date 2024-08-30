const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    env: {
      backendUrl: 'https://aleksdark1313.pythonanywhere.com',

      validUserName: process.env.CYPRESS_VALID_USERNAME,
      validPassword: process.env.CYPRESS_VALID_PASSWORD,
      
    },



  },


});
