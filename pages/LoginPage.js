module.exports = class LoginPage {

    constructor(page) {
        this.page = page;
        this.userName = page.getByPlaceholder("Username");
        this.password = page.getByPlaceholder("Password");
        this.login = page.getByRole("button", { name: "login" })

    }

    async goto() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async validLogin() {
        await this.userName.fill("standard_user");
        await this.password.fill("secret_sauce");
        await this.login.click();

    }
};



