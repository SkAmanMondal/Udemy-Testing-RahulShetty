class CartPage{
    constructor(page){
        this.page = page;
        this.products = page.locator(".cart ul");
        // this.adidasCard = page.locator("h3:has-text('ADIDAS ORIGINAL')");
        this.checkoutBtn = page.locator("li.totalRow button");
    }

    getProductLocator(productName){
        return this.page.locator("h3:has-text('"+productName+"')");
    }
    async findProduct(productName){
        await this.products.first().waitFor(); // wait for the first cart to be visible
        const bool = await this.getProductLocator(productName).isVisible();
        return bool;
    }

    async checkout(){
        await this.checkoutBtn.click();
    }


}

module.exports = {CartPage};