require('@playwright/test');
class LoginPage {

    constructor(page) {
        this.page = page;
        this.userName = ""

    }

    goto() {
        this.page.goto("https://www.saucedemo.com/");
    }
}
