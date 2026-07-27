class DashboardPage{
    constructor(page){
        this.products = page.locator(".card-body");
        this.cartLink = page.locator("[routerlink*='cart']");
    }

    async addToCart(productName){
            await this.products.first().waitFor(); // wait for the first element to be visible
            const count = await this.products.count();
            for(let i=0; i<count; ++i){
                if(await this.products.nth(i).locator("b").textContent() === productName){
        
                    // Add to Cart
                    await this.products.nth(i).locator("text= Add to Cart").click();
                    break;
                }
            }
    }

    async goToCart(){
        await this.cartLink.click();
    }
}

module.exports = {DashboardPage};