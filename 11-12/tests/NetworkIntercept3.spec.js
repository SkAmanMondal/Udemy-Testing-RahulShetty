// Here we gone a block/abort anything like files with .css or like images with .png, .jpeg

const { test } = require("@playwright/test");

test("Abort Requests", async ({ page }) => {
  await page.route("**/*.css", (route) => route.abort()); //Aborting Request with .css
  await page.route("**/*.{jpg,png,jpeg}", (route) => route.abort()); //Aborting Request with .{jpg,png,jpeg}

  // Listen for every network request sent from the page
  await page.on("request", (request) => console.log(request.url())); // Prints the URL of each outgoing request

  // Listen for every network response received by the page
  await page.on("response", (response) =>
    console.log(response.url(), response.status()),
  ); // Prints the response URL and its HTTP status code (200, 404, 500, etc.)
  
  //login and reach orders page
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("aman1221@gmail.com");
  await page.locator("#userPassword").fill("Aman@2005");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page.pause();
});
