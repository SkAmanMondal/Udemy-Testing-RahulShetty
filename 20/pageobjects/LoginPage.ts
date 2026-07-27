import {type Locator, type Page} from '@playwright/test';

export class LoginPage{
    page: Page;
    email: Locator;
    password: Locator;
    singInButton: Locator;
    toast: Locator;
    constructor(page: Page){
        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.singInButton = page.locator("#login");
        this.toast = page.locator(".toast-container");
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(email: string, password: string){
        await this.email.fill(email);
        await this.password.fill(password);
        await this.singInButton.click();
    }
}

// module.exports = {LoginPage};