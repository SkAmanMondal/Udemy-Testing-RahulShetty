const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('./utils/ApiUtils');

const loginPayload = {userEmail: "aman1221@gmail.com", userPassword: "Aman@2005"};
const orderPayload = {orders: [
        {
            country: "India",
            productOrderedId: "6960eae1c941646b7a8b3ed3"
        }]
      };

let response;

test.beforeAll( async()=>{
    const apiContext =  await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});



test("Place the order", async ({ page }) => 
{

  await page.addInitScript(value =>{

    window.localStorage.setItem('token', value);
  },response.token)


  await page.goto("https://rahulshettyacademy.com/client");
  
    await page.getByRole("listitem").getByRole('button',{name: "ORDERS"}).click();
    await page.locator("tbody").first().waitFor();

    await page.getByRole("row").filter({hasText: response.orderId}).getByRole("button",{name: "View"}).click();

    await expect(page.locator(".email-title")).toContainText(" order summary ");
    await expect(page.locator(".col-text.-main")).toContainText(response.orderId);

});