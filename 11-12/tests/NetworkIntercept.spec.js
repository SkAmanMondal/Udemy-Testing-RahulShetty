const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('./utils/ApiUtils');

const loginPayload = {userEmail: "aman1221@gmail.com", userPassword: "Aman@2005"};
const orderPayload = {orders: [
        {
            country: "India",
            productOrderedId: "6960eae1c941646b7a8b3ed3"
        }]
      };
const emptyOrderResponse = {data: [], message: "No Orders"};

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

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a44b7342f83141cc790071c", // if the user credentials changed its may not worked because of the id after 'get-orders-for-customer/' so if you put '*' after it rather than an it its works dynamically in any id (wildcard)
    async route=>
    {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(emptyOrderResponse);
      route.fulfill(
        {
          response,
          body,
        });
        // Intersepting Response(chnaging/modifying response) = API Response -> {playwright inserting fake response} -> browser -> render data on frontend
    }
  );

  await page.getByRole("listitem").getByRole('button',{name: "ORDERS"}).click();
  // await page.pause();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a44b7342f83141cc790071c"); // Some times if the original response comes in some delay then before that the fake response is already inserted, so it may show error. That's why we are using it.

  await expect(page.locator(".mt-4")).toContainText(" You have No Orders to show at this time.");

      // await page.locator("tbody").first().waitFor();

      // await page.getByRole("row").filter({hasText: response.orderId}).getByRole("button",{name: "View"}).click();

      // await expect(page.locator(".email-title")).toContainText(" order summary ");
      // await expect(page.locator(".col-text.-main")).toContainText(response.orderId);

});