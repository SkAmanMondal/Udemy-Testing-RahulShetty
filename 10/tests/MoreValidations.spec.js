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

})