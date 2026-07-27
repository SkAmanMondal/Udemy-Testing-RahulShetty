const { test, expect } = require("@playwright/test");


test("login", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("aman1221@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Aman@2005");
    await page.getByRole("button",{name: 'Login'}).click();

    await expect(page.getByText("Login Successfully")).toBeVisible(); // assertion
    
    //Add to Cart
    const productName = "ADIDAS ORIGINAL"; // This product I want to add
    await page.locator(".card-body").first().waitFor; // waiting for loding the card body 
    await page.locator(".card-body").filter({hasText: productName}).getByRole("button",{name: "Add To Cart"}).click();
    await expect(page.getByText("Product Added To Cart")).toBeVisible(); // assertion

    // Cart and Checkout
    await page.getByRole("listitem").getByRole('button',{name: "Cart"}).click();
    await page.locator(".cart ul").first().waitFor(); // wait for the cart to be visible
    await expect(page.getByRole("heading",{name:productName})).toBeVisible();
    await page.getByRole("button",{name: "Checkout"}).click();

    // Order Place
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay: 100});
    await page.getByRole("button",{name: " India"}).nth(1).click();

    await page.locator(".input.txt").nth(1).fill("999");
    await page.locator(".input.txt").nth(2).fill("ABC");
    await page.locator(".input.txt").nth(3).fill("rahulshettyacademy");

    await page.getByRole("button",{name: "Apply Coupon"}).click();
    await expect(page.getByText("* Coupon Applied")).toBeVisible();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const orderIdTrimmed = orderId.split("|")[1].trim();
    console.log(orderIdTrimmed);


    await page.getByRole("listitem").getByRole('button',{name: "ORDERS"}).click();
    await page.locator("tbody").first().waitFor();

    await page.getByRole("row").filter({hasText: orderIdTrimmed}).getByRole("button",{name: "View"}).click();

    await expect(page.locator(".email-title")).toContainText(" order summary ");
    await expect(page.locator(".col-text.-main")).toContainText(orderIdTrimmed);

    // await page.pause();


})

// test("Add to Cart", async ({page})=>{
    
// })