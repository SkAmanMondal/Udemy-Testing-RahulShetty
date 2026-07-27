import {type Locator, type Page} from '@playwright/test';

export class MyOrdersPage{
    page: Page;
    myordersLink: Locator;
    productsTable: Locator;
    productsInTable: Locator;
    title: Locator;
    orderId: Locator;
    constructor(page: Page){
        this.page = page;
        this.myordersLink = page.locator("[routerlink*='myorders']").nth(1);
        this.productsTable = page.locator("tbody");
        this.productsInTable = page.locator("tbody tr");
        this.title = page.locator(".email-title");
        this.orderId = page.locator(".col-text.-main");
    }

    async searchOrderAndView(orderIdTrimmed: string){
        await this.myordersLink.click();
            await this.productsTable.first().waitFor();

            const rowsCount = await this.productsInTable.count();
            for(let i=0; i<rowsCount; ++i){
                if(await this.productsInTable.nth(i).locator("th").textContent() === orderIdTrimmed){
        
                    await this.productsInTable.nth(i).locator("button").first().click();
                    break;
                }
            }
        
    }
}

// module.exports = {MyOrdersPage};