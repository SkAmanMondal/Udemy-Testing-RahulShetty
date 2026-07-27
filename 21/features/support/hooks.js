const playwright = require("@playwright/test");
const { POManager } = require("../../pageobjects/POManager");
const { Before, After, AfterStep,BeforeStep, Status } = require("@cucumber/cucumber");

Before(async function ({ pickle }) {

    console.log("\n=================================================");
  console.log(`🚀 Running Scenario: ${pickle.name}`);
  console.log("=================================================\n");


  this.browser = await playwright.chromium.launch({
    headless: true,
  });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.poManager = new POManager(this.page);
});


BeforeStep(function ({ pickleStep }) {
    console.log(`➡️  ${pickleStep.text}`);
});

AfterStep(async function ({ result }) {
    if (result.status === Status.PASSED) {
        console.log("✅ Passed\n");
    }
    
    if (result.status === Status.FAILED) {
        console.log("❌ Failed\n");
        
        await this.page.screenshot({
            path: `screenshots/failed-${Date.now()}.png`,
            fullPage: true,
        });
    }
});

After(async function () {
//   console.log("Closing browser...");
  await this.browser.close();
//   console.log("Browser closed.");

  console.log("🏁 Scenario Finished");
  console.log("=================================================\n");
});