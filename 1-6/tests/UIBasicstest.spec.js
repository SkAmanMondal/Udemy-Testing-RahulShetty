const { test, expect } = require("@playwright/test");

test("Browser Context Playwright Test", async ({ browser }) => {
  //Chrome -  Plugins/ Cookies
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const password = page.locator("[type='password']");
  const singInBtn = page.locator("#signInBtn");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  //get title - assertion
  console.log(await page.title());
  //css    type, fill
  await userName.fill("Aman");
  await password.fill("Learning@830$3mK2");
  await singInBtn.click();
  //wait until this locator shown up in page
  console.log(await page.locator("[style*='block']").textContent());
  //assertion
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await singInBtn.click();

  console.log(await page.locator(".card-body a").first().textContent());
  console.log(await page.locator(".card-body a").nth(0).textContent());

  //  await expect(page.locator(".card-body a").first()).toContainText('iphone X');

  console.log(await page.locator(".card-body a").allTextContents());
});

test("Page Playwright Test", async ({ page }) => {
  await page.goto("https://google.com");
  //get title - assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});


test("UI Controls Playwright Test", async ({ page }) => 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const documentLink = page.locator("[href$='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await userName.fill("Aman");
    await userName.fill("rahulshettyacademy");
    await password.fill("learning@830$3mK2");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("button#cancelBtn").waitFor();
    await page.locator("button#cancelBtn").click();
    await page.locator(".radiotextsty").last().click();
    await page.locator("button#okayBtn").waitFor();
    await page.locator("button#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").check();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    console.log(await page.locator("#terms").isChecked());
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    // await page.pause();

});

test("Child Window handle Playwright Test", async ({ browser })=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
      context.waitForEvent("page"), // Listen for any new page pending, rejected, fullfilled
      documentLink.click(), // new page is opened
    ]);
    
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    // console.log(domain);
    await page.locator("#username").fill(domain);

    console.log(await page.locator("#username").inputValue());

    // await page.pause();


});

