const {test, expect} = require('@playwright/test');

test('GetBy Practice Test', async ({ page })=>{

    await page.goto('https://rahulshettyacademy.com/angularpractice');
    
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Student').click();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('Password').fill('sam@123');
    await page.getByRole('button', {name: 'Submit'}).click();
    await expect(await page.getByText('Success! The Form has been submitted successfully!.').isVisible()).toBeTruthy();
    await page.getByRole('link', {name:'Shop'}).click();
    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    // await expect(await page.getByRole('h1', {name: 'Protractor Tutorial'}).isVisible).toBeTruthy();

})