class MyOrdersPage{
    constructor(page){
        this.myordersLink = page.locator("[routerlink*='myorders']").nth(1);
        this.productsTable = page.locator("tbody");
        this.productsInTable = page.locator("tbody tr");
        this.title = page.locator(".email-title");
        this.orderId = page.locator(".col-text.-main");
    }

    async searchOrderAndView(orderIdTrimmed){
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

module.exports = {MyOrdersPage};