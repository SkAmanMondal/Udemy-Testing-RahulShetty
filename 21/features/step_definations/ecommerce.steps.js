const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (email, password) {
  // Write code here that turns the phrase above into concrete actions

  
  //Login
      const loginPage = this.poManager.getLoginPage();
      await loginPage.goTo();
      await loginPage.validLogin(email, password);
      await expect(loginPage.toast).toContainText("Login Successfully"); // assertion
});

When('Add {string} to Cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  const dashboardPage = this.poManager.getDashboardPage();
    await dashboardPage.addToCart(productName);
    await dashboardPage.goToCart();
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  //Checkout
    const cartPage = this.poManager.getCartPage();
    const bool = await cartPage.findProduct(productName);
    await expect(bool).toBeTruthy();
    await cartPage.checkout();
});

When('Enter valid details, apply coupon {string} and placed the order', async function (couponCode) {
  // Write code here that turns the phrase above into concrete actions
  //Place Order
      const orderPage = this.poManager.getPlaceOrderPage();
      await orderPage.fillDetails();
      await orderPage.applyCoupon(couponCode);
      await expect(orderPage.couponAppliedText).toContainText("* Coupon Applied");
      await orderPage.placeOrder();
      //get order ID
      this.orderIdTrimmed = await orderPage.orderConfirmationAndOrderId();
      await expect(orderPage.title).toHaveText(" Thankyou for the order. ");
});

Then('Verify order is present in the order history', async function () {
  // Write code here that turns the phrase above into concrete actions
  //Verify Order with order ID
      const myordersPage = this.poManager.getMyOrdersPage();
      await myordersPage.searchOrderAndView(this.orderIdTrimmed);
      await expect(myordersPage.title).toContainText(" order summary ");
      await expect(myordersPage.orderId).toContainText(this.orderIdTrimmed);
});