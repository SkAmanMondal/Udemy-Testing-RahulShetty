class LoginPage{
    constructor(page){
        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.singInButton = page.locator("#login");
        this.toast = page.locator(".toast-container");
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(email, password){
        await this.email.fill(email);
        await this.password.fill(password);
        await this.singInButton.click();
    }
}

module.exports = {LoginPage};