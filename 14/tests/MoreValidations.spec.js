const {test, expect} = require('@playwright/test');

test("Pop-Up Validation", async({page})=>
{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  // await page.goto("https://google.com");
  // await page.goBack(); // Back to Rahulshettuacademy
  // await page.goForward(); // Forword or back to Google.com

  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  // await page.pause();
  page.on('dialog',dialog => dialog.accept());
  await page.locator("#confirmbtn").click();

  await page.locator("#mousehover").hover();

  const framePage = page.frameLocator("#courses-iframe");
  await framePage.locator("li a[href*='lifetime-access']:visible").click();
  const textCheck = await framePage.locator(".text h2").textContent();
  console.log(textCheck.split(" ")[1]);

});

test("Full Page & Parial Screenshot", async({page})=>{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#displayed-text").screenshot({path: "partialScreenshot.png"}); // Take only the element screenshot
  await page.screenshot({path: "beforeScreenshot.png"}); // take screenshot before click
  await page.locator("#hide-textbox").click();
  await page.screenshot({path: "afterScreenshot.png"}); // take screenshot after click
  await expect(page.locator("#displayed-text")).toBeHidden();
});

test.only("Screenshot Compairing(Visual comparison)", async({page})=>{

  await page.goto("https://www.google.com"); // if you change this url then make sure remove snapshot folder under the tests file

  await expect(await page.screenshot()).toMatchSnapshot('landing.png'); // if it runs first time it will create a screenshot and store in tests folder and fail, then after every run it will compare that screenshot.
})