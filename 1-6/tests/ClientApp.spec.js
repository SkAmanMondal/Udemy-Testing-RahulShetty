const { test, expect } = require("@playwright/test");

test("Task Website Platwright Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator(".login-wrapper-footer-text a").click(); // click on register link
  // register page
  console.log(await page.locator(".login-title").textContent());
  await page.locator("#firstName").fill("Aman");
  await page.locator("#lastName").fill("Mondal");
  await page.locator("#userEmail").fill("aman1221@gmail.com");
  await page.locator("#userMobile").fill("1234567890");
  await page.locator("select").selectOption({ value: "2: Student" });
  await page.locator("input[value='Male']").click();
  await page.locator("#userPassword").fill("Aman@2005");
  await page.locator("#confirmPassword").fill("Aman@2005");
  await page.locator("input[type='checkbox']").click();
  await page.locator("input[value='Register']").click();
    // checking toast message
  // console.log(await page.locator(".toast-container").allTextContents());
  const toast = page.locator(".toast-container");
  await expect(toast).toBeVisible();
  console.log(await toast.textContent());
  await expect(toast).toContainText("User already exisits with this Email Id!"); // assertion

  await page.locator("a[class='text-reset']").click();// click on login link

  // login page
  console.log(await page.locator("h1[class='login-title']").textContent());
  await expect(page.locator("h1[class='login-title']")).toHaveText("Log in");
  await page.locator("input[id='userEmail']").fill("aman1221@gmail.com");
    await page.locator("input[id='userPassword']").fill("Aman@2005");
    await page.locator("input[value='Login']").click();

    // Dashboard page
    // console.log(await page.locator("div[class='left mt-1'] h3").textContent());
    // await expect(page.locator("div[class='left mt-1'] h3")).toHaveText("Automation");

    await page.waitForLoadState('networkidle'); // wait for network idle state so that all the network requests are completed before proceeding and we will get the data otherwise we will get the empty array
    await page.locator(".container .row b").first().waitFor(); // wait for the first element to be visible
    // await expect(page.locator(".container .row b").first()).toBeVisible();
    console.log(await page.locator(".container .row b").allTextContents());







});