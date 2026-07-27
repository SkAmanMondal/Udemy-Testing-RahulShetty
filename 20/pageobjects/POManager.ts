import { type Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { PlaceOrderPage } from "./PlaceOrderPage";
import { MyOrdersPage } from "./MyOrdersPage";

export class POManager {

    page: Page;
    LoginPage: LoginPage;
    DashboardPage: DashboardPage;
    CartPage: CartPage;
    PlaceOrderPage: PlaceOrderPage;
    MyOrdersPage: MyOrdersPage;


    constructor(page: Page) {
        this.page = page;
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

// module.exports = {POManager};