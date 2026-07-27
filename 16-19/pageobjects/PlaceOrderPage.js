class PlaceOrderPage{
    constructor(page){
        this.selectCountry = page.locator("[placeholder*='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.dropdownBtn = this.dropdown.locator("button");
        this.cvv = page.locator(".input.txt").nth(1);
        this.nameOnCard = page.locator(".input.txt").nth(2);
        this.coupon = page.locator(".input.txt").nth(3);
        this.applyCouponBtn = page.locator("button[type*='submit']");
        this.couponAppliedText = page.locator(".mt-1.ng-star-inserted");
        this.placeOrderBtn = page.locator(".btnn.action__submit.ng-star-inserted");

        this.title = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async fillDetails(){
        await this.selectCountry.pressSequentially("ind",{delay: 100});
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdownBtn.count();
        for(let i=0; i<optionsCount; ++i){
            if(await this.dropdownBtn.nth(i).textContent() === " India"){
                await this.dropdownBtn.nth(i).click();
                break;
            }
        }
        await this.cvv.fill("999");
        await this.nameOnCard.fill("ABC");
    }
    async applyCoupon(couponCode){
        await this.coupon.fill(couponCode); // "rahulshettyacademy"
        await this.applyCouponBtn.click();
    }
    async placeOrder(){
        await this.placeOrderBtn.click();
    }

    async orderConfirmationAndOrderId(){
        await this.title.waitFor();
        const orderId = await this.orderId.textContent();
        const orderIdTrimmed  = orderId.split("|")[1].trim();

        return orderIdTrimmed;

    }
}

module.exports = {PlaceOrderPage};