const { test, expect } = require("@playwright/test");
const { customTest } = require("../utils/test-base");
const { POManager } = require("../pageobjects/POManager");
//JSON -> String -> JS Object
const dataSet = JSON.parse(JSON.stringify(require("../utils/orderValidationTestData.json")));

// test.describe.configure({ mode: 'parallel' }); //All tests will run parallelly
// test.describe.configure({ mode: 'serial' }); //Tests run one after another. If one test fails, the remaining tests in that serial group are skipped (because they likely depend on the previous test).

// Option 1 for multipel data
for(const data of dataSet){
    test(`Order Validation for ${data.productName}`, async ({page})=>{

    const poManager = new POManager(page);

    // const email = "aman1221@gmail.com";
    // const password = "Aman@2005";
    // const productName = "ADIDAS ORIGINAL";
    // const couponCode = "rahulshettyacademy";

    //Login
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.email, data.password);
    await expect(loginPage.toast).toContainText("Login Successfully"); // assertion
    
    //Add to Cart
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.addToCart(data.productName);
    await dashboardPage.goToCart();

    //Checkout
    const cartPage = poManager.getCartPage();
    const bool = await cartPage.findProduct(data.productName);
    await expect(bool).toBeTruthy();
    await cartPage.checkout();

    //Place Order
    const orderPage = poManager.getPlaceOrderPage();
    await orderPage.fillDetails();
    await orderPage.applyCoupon(data.couponCode);
    await expect(orderPage.couponAppliedText).toContainText("* Coupon Applied");
    await orderPage.placeOrder();
    //get order ID
    const orderIdTrimmed = await orderPage.orderConfirmationAndOrderId();
    await expect(orderPage.title).toHaveText(" Thankyou for the order. ");
    // console.log(orderIdTrimmed);

    //Verify Order with order ID
    const myordersPage = poManager.getMyOrdersPage();
    myordersPage.searchOrderAndView(orderIdTrimmed);
    await expect(myordersPage.title).toContainText(" order summary ");
    await expect(myordersPage.orderId).toContainText(orderIdTrimmed);

    // await page.pause();


    });
}

// Option 2 without forloop
customTest.only("Order Validation", async ({page, testDataForOrder})=>{

    const poManager = new POManager(page);

    //Login
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);
    await expect(loginPage.toast).toContainText("Login Successfully"); // assertion
    
    //Add to Cart
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.addToCart(testDataForOrder.productName);
    await dashboardPage.goToCart();

    //Checkout
    const cartPage = poManager.getCartPage();
    const bool = await cartPage.findProduct(testDataForOrder.productName);
    await expect(bool).toBeTruthy();
    await cartPage.checkout();
});
