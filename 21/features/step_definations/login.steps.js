const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('login to Ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (email, password) {
  // Write code here that turns the phrase above into concrete actions

  //Login
      this.loginPage = this.poManager.getLoginPage();
      await this.loginPage.goTo();
      await this.loginPage.validLogin(email, password);
      
});

Then('Verify login successfull message {string}', async function(message){
      await expect(this.loginPage.toast).toContainText(message); // assertion
});

Then('Verify login error message {string}', async function(message){
      await expect(this.page.getByText(message)).toBeVisible(); // assertion
});

