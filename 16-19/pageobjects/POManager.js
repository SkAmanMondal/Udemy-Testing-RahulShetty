const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { CartPage } = require("./CartPage");
const { PlaceOrderPage } = require("./PlaceOrderPage");
const { MyOrdersPage } = require("./MyOrdersPage");

class POManager {
    constructor(page) {
        this.LoginPage = new LoginPage(page);
        this.DashboardPage = new DashboardPage(page);
        this.CartPage = new CartPage(page);
        this.PlaceOrderPage = new PlaceOrderPage(page);
        this.MyOrdersPage = new MyOrdersPage(page);
    }

    getLoginPage(){
        return this.LoginPage;
    }
    getDashboardPage(){
        return this.DashboardPage;
    }
    getCartPage(){
        return this.CartPage;
    }
    getPlaceOrderPage(){
        return this.PlaceOrderPage;
    }
    getMyOrdersPage(){
        return this.MyOrdersPage;
    }
}

module.exports = {POManager};