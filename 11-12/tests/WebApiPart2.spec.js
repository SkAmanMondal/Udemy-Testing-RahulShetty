// login ui -> .json
// test browser-> .json , cart, order, order-details, order-history


const { test, expect } = require('@playwright/test');
let webContext;
let orderIdTrimmed;

test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("input[id='userEmail']").fill("aman1221@gmail.com");
    await page.locator("input[id='userPassword']").fill("Aman@2005");
    await page.locator("input[value='Login']").click();
    const toast = page.locator(".toast-container");
    await expect(toast).toContainText("Login Successfully"); // assertion
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
});

test('Place the Order', async()=>
{
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    //Add to Cart
    const productName = "ADIDAS ORIGINAL";
    await page.locator(".card-body").last().waitFor(); // wait for the last element to be visible
    const products = page.locator(".card-body");
    const count = await products.count();
    for(let i=0; i<count; ++i){
        if(await products.nth(i).locator("b").textContent() === productName){

            // Add to Cart
            await products.nth(i).locator("text= Add to Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator(".cart ul").last().waitFor(); // wait for the cart to be visible
    // await expect(page.locator(".cart ul").last()).toContainText(productName);
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    await expect(bool).toBeTruthy();

    await page.locator("li.totalRow button").click();

    await page.locator("[placeholder*='Select Country']").pressSequentially("ind",{delay: 100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i<optionsCount; ++i){
        if(await dropdown.locator("button").nth(i).textContent() === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    // await expect(page.locator(".user__name input[type='text']")).toHaveText("aman1221@gmail.com");

    await page.locator(".input.txt").nth(1).fill("999");
    await page.locator(".input.txt").nth(2).fill("ABC");
    await page.locator(".input.txt").nth(3).fill("rahulshettyacademy");

    await page.locator("button[type*='submit']").click();
    await expect(page.locator(".mt-1.ng-star-inserted")).toContainText("* Coupon Applied");

    await page.locator(".btnn.action__submit.ng-star-inserted").click();
    await page.locator(".hero-primary").waitFor();

    await expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    orderIdTrimmed = orderId.split("|")[1].trim();
    console.log(orderIdTrimmed);

});

test('Verify Order Id', async()=>
{
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    
    await page.locator("[routerlink*='myorders']").click();
    await page.locator("tbody").first().waitFor();

    const productsInTable = page.locator("tbody tr");

    const rowsCount = await productsInTable.count();
    for(let i=0; i<rowsCount; ++i){
        if(await productsInTable.nth(i).locator("th").textContent() === orderIdTrimmed){

            await productsInTable.nth(i).locator("button").first().click();
            break;
        }
    }

    await expect(page.locator(".email-title")).toContainText(" order summary ");
    await expect(page.locator(".col-text.-main")).toContainText(orderIdTrimmed);
});